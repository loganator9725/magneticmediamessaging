import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Rocket, TrendingUp } from "lucide-react";

const packages = [
  {
    name: "Media Breakthrough",
    price: "$1,500",
    icon: Zap,
    description: "Perfect for launching your first campaign",
    features: [
      "Professional press release writing",
      "Targeted media outreach",
      "Strategic follow-up",
      "Campaign summary report",
    ],
    badge: "One-Time Campaign",
    color: "navy"
  },
  {
    name: "Visibility Sprint",
    price: "$2,500",
    icon: Rocket,
    description: "Accelerated 30-day visibility boost",
    features: [
      "Multiple story angles development",
      "Custom media kit creation",
      "Enhanced media outreach",
      "Campaign analytics & reporting",
      "Social media amplification strategy",
    ],
    badge: "30-Day Campaign",
    popular: true,
    color: "gold"
  },
  {
    name: "Story Strategy Retainer",
    price: "$3,500",
    icon: TrendingUp,
    description: "Comprehensive 90-day engagement",
    features: [
      "Strategic positioning & messaging",
      "Ongoing media outreach",
      "Quarterly content strategy",
      "Monthly analytics & insights",
      "Priority support & consulting",
      "Media training session",
    ],
    badge: "90-Day Partnership",
    color: "secondary"
  },
];

const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-gradient-elegant">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              PR Packages That Get You <span className="text-gold">Noticed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Magnetic Media offers ethical, strategic, relationship-based public relations that helps 
              small businesses grow through visibility and credibility.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <Card 
                  key={pkg.name} 
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-lifted animate-fade-up ${
                    pkg.popular ? 'ring-2 ring-gold shadow-gold scale-105' : 'shadow-elegant'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gold text-accent-foreground px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="font-serif text-2xl text-foreground">{pkg.name}</CardTitle>
                    <div className="text-4xl font-bold text-gold my-2">{pkg.price}</div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {pkg.badge}
                    </CardDescription>
                    <p className="text-sm text-foreground mt-2">{pkg.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={scrollToContact}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              While media coverage can never be guaranteed, we guarantee persistence, professionalism, 
              and storytelling that gets noticed. Our track record speaks for itself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
