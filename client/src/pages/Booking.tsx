import { BookingFlow } from "@/components/BookingFlow";
import { Footer } from "@/components/Footer";

export default function Booking() {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Book Your Appointment</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select your preferred service, time, and stylist in just a few clicks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BookingFlow />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
