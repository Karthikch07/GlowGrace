import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { connectMongoDB, Service, Product, Booking, Order, Review } from "./mongodb";
import { User } from "./mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { body, validationResult } from "express-validator";


let stripe: any;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
  });
} else {
  console.warn("STRIPE_SECRET_KEY not set — using mock Stripe for local development");
  stripe = {
    paymentIntents: {
      create: async ({ amount, currency }: { amount: number; currency: string }) => {
        
        return { client_secret: "pi_test_client_secret" };
      },
    },
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  await setupAuth(app);
  
  
  await connectMongoDB();

  
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  
  app.get('/api/services', async (req, res) => {
    try {
      const { category, search } = req.query;
      let query: any = {};
      
      if (category && category !== 'All') {
        query.category = category;
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      
      const services = await Service.find(query);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.post('/api/services', isAuthenticated, async (req, res) => {
    try {
      const service = new Service(req.body);
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  
  app.get('/api/products', async (req, res) => {
    try {
      const { category, search } = req.query;
      let query: any = {};
      
      if (category && category !== 'All') {
        query.category = category;
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } }
        ];
      }
      
      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post('/api/products', isAuthenticated, async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'email and password required' });
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'User exists' });
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ email, passwordHash: hash, firstName, lastName });
      await user.save();
      const token = jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.SESSION_SECRET || 'dev-secret', { expiresIn: '7d' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.SESSION_SECRET || 'dev-secret', { expiresIn: '7d' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.get('/api/auth/me', async (req: any, res) => {
    try {
      const auth = (req.headers.authorization || '').split(' ');
      if (auth[0] === 'Bearer' && auth[1]) {
        try {
          const payload: any = jwt.verify(auth[1], process.env.SESSION_SECRET || 'dev-secret');
          const user = await User.findById(payload.sub).lean();
          if (!user) return res.status(404).json({ message: 'Not found' });
          return res.json({ id: user._id.toString(), email: user.email, firstName: user.firstName, lastName: user.lastName });
        } catch (e) {
          return res.status(401).json({ message: 'Invalid token' });
        }
      }
      res.status(401).json({ message: 'Unauthorized' });
    } catch (error) {
      res.status(500).json({ message: 'Failed' });
    }
  });

  
  app.get('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const booking = new Booking({
        ...req.body,
        userId,
      });
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  
  app.get('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const order = new Order({
        ...req.body,
        userId,
      });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  
  app.post("/api/create-payment-intent", isAuthenticated, async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), 
        currency: "usd",
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  
  app.get('/api/reviews/:type/:id', async (req, res) => {
    try {
      const { type, id } = req.params;
      const query = type === 'service' ? { serviceId: id } : { productId: id };
      const reviews = await Review.find(query).sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post('/api/reviews', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      const review = new Review({
        ...req.body,
        userId,
        userName: user?.firstName && user?.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user?.email || 'Anonymous',
      });
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
