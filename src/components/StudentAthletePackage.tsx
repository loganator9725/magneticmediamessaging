import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Target, Newspaper, CheckCircle2 } from "lucide-react";

const StudentAthletePackage = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "Personalized athlete profile development",
    "Strategic media outreach to college recruiters",
    "Professional press release highlighting achievements",
    "Social media content package (10 posts)",
    "Algorithmic matching for optimal college exposure",
    "Monthly performance tracking & reporting"
  ];

  return (
    <section id="package-student-athlete" className="py-24 bg-gradient-elegant">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-hero rounded-full mb-6">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              The <span className="text-gold">Recruit's Edge</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Algorithmic matching for college recruitment exposure. Turn athletic excellence into visibility that gets you noticed by the right programs.
            </p>
          </div>

          {/* Main Card */}
          <Card className="shadow-lifted animate-fade-up border-gold/20">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-serif mb-2">Student Athlete Visibility Package</CardTitle>
              <CardDescription className="text-lg">
                Strategic PR designed specifically for college recruitment
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gold">$1,200</span>
                <span className="text-muted-foreground ml-2">/3 months</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features Grid */}
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Value Props */}
              <div className="grid md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                <div className="text-center p-4">
                  <Target className="w-8 h-8 text-gold mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Targeted Reach</h4>
                  <p className="text-sm text-muted-foreground">Algorithmic matching connects you with relevant programs</p>
                </div>
                <div className="text-center p-4">
                  <Newspaper className="w-8 h-8 text-gold mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Media Coverage</h4>
                  <p className="text-sm text-muted-foreground">Professional storytelling that highlights your achievements</p>
                </div>
                <div className="text-center p-4">
                  <Award className="w-8 h-8 text-gold mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Competitive Edge</h4>
                  <p className="text-sm text-muted-foreground">Stand out in a crowded recruitment landscape</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <Button 
                  size="lg"
                  variant="hero"
                  onClick={scrollToContact}
                  className="shadow-gold hover:shadow-lifted transition-all duration-300"
                >
                  Get Your Recruiting Edge
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  Limited spots available • Results-driven approach
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StudentAthletePackage;
