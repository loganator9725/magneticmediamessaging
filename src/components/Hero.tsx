import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional PR Strategy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy-dark/95" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sparkle Icon */}
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="p-3 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-primary-foreground animate-fade-up">
            Creating a stir with stories that{" "}
            <span className="text-gold">inspire trust</span> and{" "}
            <span className="text-gold">visibility</span>.
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            We help entrepreneurs and experts become less of a well-kept secret.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg"
              variant="hero"
              onClick={() => scrollToSection('contact')}
              className="group shadow-gold hover:shadow-lifted transition-all duration-300"
            >
              Book a Consultation
              <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline-hero"
              onClick={() => scrollToSection('services')}
            >
              See Our Packages
            </Button>
          </div>

          {/* Tagline */}
          <p className="mt-12 text-primary-foreground/70 text-sm uppercase tracking-wider font-medium animate-fade-up" style={{ animationDelay: '0.6s' }}>
            PR as the New SEO • Visibility Through Storytelling
          </p>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
