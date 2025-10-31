import { Card, CardContent } from "@/components/ui/card";
import { Quote, TrendingUp, Users, Award } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Founder, Wellness Collective",
    content: "Jennifer transformed our visibility overnight. Within 30 days, we were featured in three major publications and saw a 45% increase in website traffic. Her storytelling approach is pure magic.",
    image: "SM"
  },
  {
    name: "David Chen",
    role: "CEO, TechStart Solutions",
    content: "The media kit M3 created positioned us as thought leaders in our industry. We've had consistent media coverage ever since, and our credibility has skyrocketed. Worth every penny.",
    image: "DC"
  },
  {
    name: "Rachel Thompson",
    role: "Author & Speaker",
    content: "I was a well-kept secret until I worked with Magnetic Media. Now I'm regularly invited to speak and contribute to major platforms. Jennifer's strategy and persistence made all the difference.",
    image: "RT"
  }
];

const stats = [
  {
    icon: TrendingUp,
    value: "3.2x",
    label: "Average Media Coverage Multiplier",
  },
  {
    icon: Users,
    value: "45%",
    label: "Average Traffic Increase",
  },
  {
    icon: Award,
    value: "89%",
    label: "Client Retention Rate",
  },
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

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={stat.label} 
                  className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm text-center animate-fade-up hover:bg-primary-foreground/15 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className="text-4xl font-bold text-gold mb-2">{stat.value}</div>
                    <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
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
