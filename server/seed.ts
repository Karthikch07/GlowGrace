import { connectMongoDB, Service, Product } from "./mongodb";

const servicesData = [
  {
    name: "Relaxation Massage",
    category: "Spa",
    description: "Full body massage with aromatherapy",
    duration: "60 min",
    price: 1150,
    image: "/assets/stock_images/spa_massage_therapy__0dc874f5.jpg"
  },
  {
    name: "Hot Stone Therapy",
    category: "Spa",
    description: "Deep tissue massage with heated stones",
    duration: "90 min",
    price: 1450,
    image: "/assets/stock_images/hot_stone_massage_6c34b301.jpg"
  },
  {
    name: "Classic Haircut",
    category: "Barbershop",
    description: "Traditional cut with hot towel finish",
    duration: "30 min",
    price: 149,
    image: "/assets/stock_images/modern_barbershop_in_ed205b41.jpg"
  },
  {
    name: "Beard Grooming",
    category: "Barbershop",
    description: "Trim, shape and conditioning",
    duration: "20 min",
    price: 99,
    image: "/assets/stock_images/breadgrooming.jpg"
  },
  {
    name: "Personal Training",
    category: "Fitness",
    description: "One-on-one fitness coaching",
    duration: "60 min",
    price: 99,
    image: "/assets/stock_images/Personal Training.jpeg"
  },
  {
    name: "Yoga Class",
    category: "Fitness",
    description: "Group yoga session for all levels",
    duration: "45 min",
    price: 125,
    image: "/assets/stock_images/yoga_fitness_class_51fa1f1f.jpg"
  },
  {
    name: "Botox Treatment",
    category: "MedSpa",
    description: "Professional wrinkle reduction",
    duration: "30 min",
    price: 1350,
    image: "/assets/stock_images/Botox Treatment.jpeg"
  },
  {
    name: "Hair Styling",
    category: "Salon",
    description: "Professional styling for any occasion",
    duration: "45 min",
    price: 285,
    image: "/assets/stock_images/hair_salon_styling_c_a9b33900.jpg"
  }
];

const productsData = [
  {
    name: "Hydrating Serum",
    brand: "Luxe Beauty",
    description: "Deep hydration serum with hyaluronic acid",
    category: "Skincare",
    rating: 4.8,
    reviews: 234,
    price: 499,
    originalPrice: 799,
    stock: 50,
    image: "/assets/stock_images/hydratingserum.jpg"
  },
  {
    name: "Night Cream",
    brand: "Glow Essentials",
    description: "Nourishing night cream for radiant skin",
    category: "Skincare",
    rating: 4.9,
    reviews: 189,
    price: 399,
    stock: 45,
    image: "/assets/stock_images/instaglownightcream.jpg"
  },
  {
    name: "Face Mask Set",
    brand: "Pure Radiance",
    description: "Set of 5 premium face masks",
    category: "Skincare",
    rating: 4.7,
    reviews: 312,
    price: 349,
    originalPrice: 499,
    stock: 60,
    image: "/assets/stock_images/facemaskset.jpg"
  },
  {
    name: "Lip Treatment",
    brand: "Velvet Touch",
    description: "Luxurious lip treatment and color",
    category: "Makeup",
    rating: 4.6,
    reviews: 156,
    price: 149,
    stock: 80,
    image: "/assets/stock_images/velvettouchblush.jpeg"
  },
  {
    name: "Eye Cream",
    brand: "Luxe Beauty",
    description: "Anti-aging eye cream",
    category: "Skincare",
    rating: 4.8,
    reviews: 198,
    price: 499,
    stock: 40,
    image: "/assets/stock_images/eyecream.jpeg"
  },
  {
    name: "Cleanser",
    brand: "Glow Essentials",
    description: "Gentle daily cleanser",
    category: "Skincare",
    rating: 4.7,
    reviews: 276,
    price: 299,
    originalPrice: 399,
    stock: 70,
    image: "/assets/stock_images/Cleanser.jpeg"
  },
  {
    name: "Toner",
    brand: "Velvet Touch",
    description: "Balancing facial toner",
    category: "Makeup",
    rating: 4.5,
    reviews: 167,
    price: 329,
    stock: 55,
    image: "/assets/stock_images/makeup_beauty_produc_554f7469.jpg"
  },
  {
    name: "Vitamin C Serum",
    brand: "Radiant Glow",
    description: "Brightening vitamin C serum",
    category: "Makeup",
    rating: 4.9,
    reviews: 398,
    price: 349,
    stock: 65,
    image: "/assets/stock_images/Vitamin C Serum.jpeg"
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await connectMongoDB();

    console.log("Clearing existing services and products...");
    await Service.deleteMany({});
    await Product.deleteMany({});

    console.log("Seeding services...");
    const services = await Service.insertMany(servicesData);
    console.log(`✅ ${services.length} services added successfully!`);

    console.log("Seeding products...");
    const products = await Product.insertMany(productsData);
    console.log(`✅ ${products.length} products added successfully!`);

    console.log("\n🎉 Database seeded successfully!");
    console.log(`   Services: ${services.length}`);
    console.log(`   Products: ${products.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
