import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I book a service?",
      answer: "Navigate to our Services page, select the service you want, click 'Book Now', choose your preferred date, time, and stylist, then complete the payment through our secure QR code payment system."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI payments through PhonePe, Google Pay, and Paytm. Simply scan the QR code during checkout and complete the payment through your preferred UPI app."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Please contact us at +91-789456123 or email contact@glowgrace.com for assistance."
    },
    {
      question: "How long does shipping take for products?",
      answer: "Standard shipping typically takes 3-5 business days within Hyderabad and 5-7 business days for other locations in India. You'll receive tracking information once your order ships."
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes! We offer gift cards in various denominations. Contact us directly or visit our salon to purchase gift cards for your loved ones."
    },
    {
      question: "What is your return policy for products?",
      answer: "We accept returns within 7 days of delivery for unopened and unused products. Please ensure the product is in its original packaging with all tags intact."
    },
    {
      question: "Are your stylists certified?",
      answer: "Yes, all our professionals are certified and have extensive experience in their respective fields. We regularly train our team on the latest beauty trends and techniques."
    },
    {
      question: "Do you offer group bookings or packages?",
      answer: "Yes, we offer special packages for bridal parties, group spa days, and corporate wellness events. Contact us for custom packages tailored to your needs."
    },
    {
      question: "Can I purchase products in-store?",
      answer: "Yes, all our products are available for purchase at our Miyapur location. Visit us during business hours to explore our full product range."
    }
  ];

  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions about our services, bookings, and products
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center bg-muted/30 p-8 rounded-lg">
              <h2 className="font-serif text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our customer support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Contact Us
                </a>
                <a href="tel:+91789456123" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Call +91-789456123
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
