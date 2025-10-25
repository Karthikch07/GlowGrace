import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "10 Essential Skincare Tips for Glowing Skin",
      excerpt: "Discover the secrets to radiant, healthy skin with these expert-approved skincare tips and daily routines that really work.",
      author: "Dr. Priya Sharma",
      date: "October 20, 2025",
      category: "Skincare",
      image: "/assets/stock_images/hydratingserum.jpg"
    },
    {
      title: "Hair Care Routines for Different Hair Types",
      excerpt: "Learn how to care for your unique hair type with these customized hair care routines from our expert stylists.",
      author: "Rahul Mehta",
      date: "October 15, 2025",
      category: "Hair Care",
      image: "/assets/stock_images/hair_salon_styling_c_a9b33900.jpg"
    },
    {
      title: "The Benefits of Regular Spa Treatments",
      excerpt: "Explore how regular spa visits can improve your physical and mental wellbeing, reduce stress, and boost confidence.",
      author: "Anjali Reddy",
      date: "October 10, 2025",
      category: "Wellness",
      image: "/assets/stock_images/spa_massage_therapy__0dc874f5.jpg"
    },
    {
      title: "Bridal Beauty Timeline: 6 Months to Your Big Day",
      excerpt: "A comprehensive guide to preparing your skin, hair, and overall look for your wedding with our step-by-step timeline.",
      author: "Kavya Iyer",
      date: "October 5, 2025",
      category: "Bridal",
      image: "/assets/stock_images/makeup_beauty_produc_554f7469.jpg"
    },
    {
      title: "Understanding Different Massage Techniques",
      excerpt: "From Swedish to deep tissue, learn about various massage styles and their benefits for relaxation and healing.",
      author: "Dr. Priya Sharma",
      date: "September 28, 2025",
      category: "Spa",
      image: "/assets/stock_images/hot_stone_massage_6c34b301.jpg"
    },
    {
      title: "Fitness and Beauty: The Perfect Combination",
      excerpt: "Discover how regular exercise contributes to your overall beauty, confidence, and inner glow that no makeup can replicate.",
      author: "Fitness Team",
      date: "September 20, 2025",
      category: "Fitness",
      image: "/assets/stock_images/yoga_fitness_class_51fa1f1f.jpg"
    }
  ];

  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Beauty & Wellness Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert tips, trends, and insights from our beauty professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={index} className="group cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 space-y-3">
                  <div className="mb-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline">Load More Posts</Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
