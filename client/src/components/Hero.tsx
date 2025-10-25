import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/elegantsalon.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="GlowGrace salon" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Transform Your Beauty Routine
              </h1>
              <p className="text-lg sm:text-xl text-foreground/90 font-medium max-w-lg">
                Discover premium beauty and fashion services. Book appointments with top professionals or shop luxury products delivered to your door.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="gap-2" data-testid="button-explore-services">
                  <Calendar className="h-5 w-5" />
                  Explore Services
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="purple" className="gap-2 backdrop-blur-md" data-testid="button-trending-products">
                  <ShoppingBag className="h-5 w-5" />
                  Trending Products
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">1K+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Expert Professionals</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold">7+</div>
                <div className="text-sm text-muted-foreground">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
