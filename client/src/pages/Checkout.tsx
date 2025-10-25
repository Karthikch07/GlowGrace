import React, { useState } from 'react';
import { useCart } from "../lib/cart.jsx";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { formatCurrency } from "../lib/format";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import QRPayment from "@/components/QRPayment";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showQRPayment, setShowQRPayment] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
  const taxRate = 0.08;
  const shipping = subtotal > 0 ? 5.0 : 0.0;
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + tax + shipping).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.fullName || !formData.address || !formData.city || !formData.state || !formData.zip) {
      toast({
        title: "Missing Information",
        description: "Please fill in your contact and shipping information.",
        variant: "destructive",
      });
      return;
    }

    setShowQRPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowQRPayment(false);
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: `Your order of ${formatCurrency(total)} has been confirmed. We'll send you a confirmation email shortly.`,
    });
    setLocation('/');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription>Add some items to your cart before checking out.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation('/products')}>Browse Products</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Miyapur"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      placeholder="Telangana"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    name="zip"
                    type="text"
                    placeholder="500049"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Complete your payment using UPI (PhonePe, Google Pay, Paytm)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-6 text-center space-y-3">
                  <div className="flex justify-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                        📱
                      </div>
                      <span className="text-sm font-medium">PhonePe</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                        💳
                      </div>
                      <span className="text-sm font-medium">Google Pay</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-2xl">
                        💰
                      </div>
                      <span className="text-sm font-medium">Paytm</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You'll be able to scan a QR code to complete your payment securely
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setLocation('/cart')}>
                Back to Cart
              </Button>
              <Button type="submit" className="flex-1">
                Proceed to Payment - {formatCurrency(total)}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatCurrency((item.price || 0) * (item.quantity || 1))}</span>
                  </div>
                ))}
              </div>
              
              <div className="h-px bg-border" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
              </div>
              
              <div className="h-px bg-border" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QR Payment Dialog */}
      <QRPayment
        isOpen={showQRPayment}
        onClose={() => setShowQRPayment(false)}
        onSuccess={handlePaymentSuccess}
        amount={total}
        title="Complete Your Order"
        description="Scan the QR code to complete your purchase"
      />
    </div>
  );
}
