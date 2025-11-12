import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lee Walker",
    role: "Founder, Daily Driver Consulting",
    content: "Jennifer is 100% the person you need by your side as a business owner looking to make a difference in the world. She goes above and beyond to help you put out your story to make sure it gets the attention it deserves and more. You might think PR value is outdated until you talk to her and find out what it can really do for your brand!",
    image: "LW"
  },
  {
    name: "Dr. Joseph Drolshagen",
    role: "The Rapid Revenue Growth Specialist, Author, Reprogramming Your Subconscious Mind: The SMT Method™ For Rapid Results",
    content: "Jennifer is such a powerful and caring PR Strategist! I'm am so excited to be working together!",
    image: "JD"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-navy text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Results That <span className="text-gold">Create a Stir</span>
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Don't just take our word for it. See how we've helped businesses shine.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name} 
                className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/15 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="pt-6">
                  <Quote className="w-10 h-10 text-gold mb-4 opacity-50" />
                  <p className="text-primary-foreground/90 leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center font-semibold text-gold">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground">{testimonial.name}</p>
                      <p className="text-sm text-primary-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
