import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { formatCurrency } from "../lib/format";

interface ServiceCardProps {
  image: string;
  category: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  id?: number;
  onBook?: () => void;
}

export function ServiceCard({
  image,
  category,
  name,
  description,
  duration,
  price,
  id,
  onBook,
}: ServiceCardProps) {
  const [, navigate] = useLocation();

  return (
    <Card className="overflow-hidden group cursor-pointer hover-elevate transition-all duration-300 hover:-translate-y-2" data-testid={`card-service-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute top-4 right-4" data-testid={`badge-category-${category.toLowerCase()}`}>
          {category}
        </Badge>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-serif text-xl font-semibold mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">₹</span>
            <span className="font-semibold text-foreground">{formatCurrency(typeof price === 'string' ? parseFloat(price) : (price as any))}</span>
          </div>
        </div>

        {onBook ? (
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onBook?.();
              console.log("Book service:", name);
            }}
            data-testid={`button-book-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Book Now
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              try {
                if (typeof window !== 'undefined' && id != null) {
                  sessionStorage.setItem('preselectedServiceId', String(id));
                }
              } catch (err) {
                
              }
              if (id != null) {
                navigate(`/booking?serviceId=${encodeURIComponent(String(id))}`);
              } else {
                navigate(`/booking?serviceId=${encodeURIComponent(name)}`);
              }
            }}
            data-testid={`button-book-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Book Now
          </Button>
        )}
      </div>
    </Card>
  );
}
