import { Heart, Lightbulb, Shield, Sparkles, Star } from "lucide-react";
import jenniferPortrait from "@/assets/jennifer-portrait.jpg";

const values = [
  { icon: Shield, label: "Integrity", color: "text-navy" },
  { icon: Heart, label: "Compassion", color: "text-secondary" },
  { icon: Sparkles, label: "Inspiration", color: "text-gold" },
  { icon: Star, label: "Commitment", color: "text-navy-light" },
  { icon: Lightbulb, label: "Wonder", color: "text-gold-glow" },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={jenniferPortrait}
                alt="Jennifer Paire, Founder of Magnetic Media & Messaging"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Content */}
          <div className="animate-fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Magnetic Media & Messaging
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded by <span className="text-foreground font-semibold">Jennifer Paire</span>, 
                a journalist-turned-PR strategist with over 30 years of experience, Magnetic Media & 
                Messaging is more than a boutique agency - it's a partnership built on authenticity.
              </p>
              
              <p>
                Our mission is simple: <span className="text-secondary font-medium">helping purpose-driven 
                professionals share what matters most</span>. Whether you're launching a business, scaling 
                your impact, or stepping into the spotlight for the first time, we craft the stories that 
                make people listen.
              </p>

              <div className="my-8 p-6 bg-gradient-elegant rounded-xl border-l-4 border-gold shadow-elegant">
                <p className="font-serif text-xl text-foreground italic leading-relaxed">
                  "Every great brand has a story worth telling - it just needs the right words and a 
                  little spark to create a stir."
                </p>
                <p className="text-sm text-muted-foreground mt-2">- Jennifer Paire</p>
              </div>

              {/* Values */}
              <div className="pt-6">
                <h3 className="font-semibold text-foreground text-xl mb-4">Our Values</h3>
                <div className="flex flex-wrap gap-4">
                  {values.map((value) => {
                    const Icon = value.icon;
                    return (
                      <div
                        key={value.label}
                        className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm border border-border hover:shadow-elegant transition-all duration-300"
                      >
                        <Icon className={`w-4 h-4 ${value.color}`} />
                        <span className="text-sm font-medium text-foreground">{value.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
