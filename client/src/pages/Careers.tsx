import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";

export default function Careers() {
  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Great Team",
      description: "Work with passionate professionals in a supportive environment"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Career Growth",
      description: "Continuous learning opportunities and career advancement"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Work-Life Balance",
      description: "Flexible schedules and employee wellness programs"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Competitive Pay",
      description: "Industry-leading compensation and benefits package"
    }
  ];

  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Join Our Team</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Be part of Hyderabad's premier beauty and wellness destination
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-muted/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">Current Openings</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Hair Stylist</h3>
                    <p className="text-muted-foreground">Full-time • Miyapur, Hyderabad</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
                <p className="text-muted-foreground">
                  We're looking for an experienced hair stylist with 3+ years of experience in cutting, coloring, and styling.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Spa Therapist</h3>
                    <p className="text-muted-foreground">Full-time • Miyapur, Hyderabad</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
                <p className="text-muted-foreground">
                  Seeking a certified spa therapist specializing in massage therapy and body treatments.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Receptionist</h3>
                    <p className="text-muted-foreground">Full-time • Miyapur, Hyderabad</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
                <p className="text-muted-foreground">
                  Looking for a friendly receptionist to manage bookings and provide excellent customer service.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Fitness Instructor</h3>
                    <p className="text-muted-foreground">Part-time • Miyapur, Hyderabad</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
                <p className="text-muted-foreground">
                  Certified yoga or fitness instructor to lead group classes and personal training sessions.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center bg-muted/30 p-8 rounded-lg">
              <h3 className="font-serif text-2xl font-bold mb-4">Don't see your role?</h3>
              <p className="text-muted-foreground mb-6">
                Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Button size="lg">Submit Your Resume</Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
