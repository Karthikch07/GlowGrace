import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: October 24, 2025</p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using GlowGrace's website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Services</h2>
                <p className="mb-4">
                  GlowGrace provides beauty and wellness services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hair salon services</li>
                  <li>Spa and wellness treatments</li>
                  <li>Barbershop services</li>
                  <li>MedSpa treatments</li>
                  <li>Fitness and yoga classes</li>
                  <li>Sale of beauty and skincare products</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Booking and Appointments</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All bookings must be made through our website or by contacting us directly.</li>
                  <li>Appointments are confirmed upon successful payment.</li>
                  <li>You must arrive 10 minutes before your scheduled appointment time.</li>
                  <li>Late arrivals may result in reduced service time or rescheduling.</li>
                  <li>We reserve the right to refuse service to anyone for any reason.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Cancellation and Refund Policy</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Services:</strong> Cancellations must be made at least 24 hours in advance for a full refund.</li>
                  <li>Cancellations within 24 hours will forfeit 50% of the booking amount.</li>
                  <li>No-shows will forfeit the full booking amount.</li>
                  <li><strong>Products:</strong> Unopened products may be returned within 7 days of delivery.</li>
                  <li>Refunds will be processed within 7-10 business days.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Payment Terms</h2>
                <p className="mb-4">
                  We accept UPI payments through PhonePe, Google Pay, and Paytm. By providing payment information, you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Confirm that you are authorized to use the payment method</li>
                  <li>Authorize us to charge the full amount for services or products</li>
                  <li>Agree to pay all applicable taxes and fees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. User Responsibilities</h2>
                <p className="mb-4">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Treat staff and other customers with respect</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Health and Safety</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Inform us of any allergies, medical conditions, or sensitivities before services.</li>
                  <li>We are not liable for reactions to products or services if relevant information was not disclosed.</li>
                  <li>Pregnant clients should consult their doctor before certain treatments.</li>
                  <li>We follow strict hygiene and sanitation protocols.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, and images, is the property of GlowGrace and protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
                <p>
                  GlowGrace shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or products. Our total liability shall not exceed the amount paid for the service or product in question.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul className="space-y-2">
                  <li>Email: contact@glowgrace.com</li>
                  <li>Phone: +91-789456123</li>
                  <li>Address: Miyapur, Hyderabad, Telangana</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
