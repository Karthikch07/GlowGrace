import { ServiceCard } from "./ServiceCard";
import { allServices } from "@/lib/catalog";


const featuredServices = allServices.slice(0, 4);

export function FeaturedServices() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Featured Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked experiences from our most popular services — visit Our Services to explore all options
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
