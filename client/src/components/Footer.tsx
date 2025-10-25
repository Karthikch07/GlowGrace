import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiInstagram, SiFacebook, SiX, SiTiktok } from "react-icons/si";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  function validateEmail(value: string) {
    return /^\S+@\S+\.\S+$/.test(value);
  }

  function handleSubscribe() {
    if (!email || !validateEmail(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem('newsletter_emails', JSON.stringify(existing));
      }
      toast({
        title: 'Subscribed',
        description: 'Thanks — you are now subscribed to our newsletter!',
      });
      setEmail('');
    } catch (err) {
      console.error('subscribe error', err);
      toast({
        title: 'Subscribe failed',
        description: 'An error occurred while subscribing. Please try again later.',
      });
    }
  }

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-salon">Hair Salon</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-spa">Spa & Wellness</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-barbershop">Barbershop</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-medspa">MedSpa</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-fitness">Fitness</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Contact</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-careers">Careers</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-blog">Blog</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Miyapur</li>
              <li>Hyderabad, Telangana</li>
              <li>contact@glowgrace.com</li>
              <li>+91-789456123</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe for exclusive offers and beauty tips
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1"
                data-testid="input-newsletter-email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Button type="button" data-testid="button-newsletter-subscribe" onClick={() => { console.log('subscribe clicked'); handleSubscribe(); }}>Subscribe</Button>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" size="icon" data-testid="button-social-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-twitter">
                <SiX className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-tiktok">
                <SiTiktok className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 GlowGrace. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
