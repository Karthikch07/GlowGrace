import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Award, Heart, Users, Sparkles } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", description: "We maintain the highest standards in beauty and wellness services" },
  { icon: Heart, title: "Care", description: "Your wellbeing and satisfaction are at the heart of everything we do" },
  { icon: Users, title: "Community", description: "Building lasting relationships with our clients and professionals" },
  { icon: Sparkles, title: "Innovation", description: "Staying ahead with the latest beauty trends and techniques" },
];

export default function About() {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">About GlowGrace</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Your trusted platform for discovering and booking premium beauty and wellness services since 2025
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg">
                GlowGrace connects beauty enthusiasts with top-rated professionals across salons, spas, barbershops, medspas, and fitness centers. We've revolutionized how people discover, book, and experience beauty services.
              </p>
              <p className="text-lg">
                With over 1,000 happy clients and 50+ expert professionals across 7+ locations, we're committed to making premium beauty services accessible, convenient, and enjoyable for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="p-6 text-center">
                  <value.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-serif text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
