import { Card } from "@/components/ui/card";
import { Sparkles, Scissors, Dumbbell, Heart, Zap, Users } from "lucide-react";

const categories = [
  { icon: Sparkles, name: "Spa & Wellness", count: 45, color: "text-chart-3" },
  { icon: Scissors, name: "Hair Salon", count: 68, color: "text-primary" },
  { icon: Dumbbell, name: "Fitness", count: 32, color: "text-chart-4" },
  { icon: Heart, name: "MedSpa", count: 28, color: "text-chart-2" },
  { icon: Zap, name: "Barbershop", count: 41, color: "text-chart-1" },
  { icon: Users, name: "Beauty Studio", count: 55, color: "text-chart-5" },
];

export function CategorySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Explore Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From relaxation to transformation, find the perfect service for your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="p-6 hover-elevate cursor-pointer transition-all duration-300 hover:-translate-y-1 text-center"
              onClick={() => console.log('Category clicked:', category.name)}
              data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <category.icon className={`h-10 w-10 mx-auto mb-3 ${category.color}`} />
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} services</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
