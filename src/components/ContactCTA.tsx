import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactCTA = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Submit to Netlify Forms using fetch with form encoding
      const formBody = new URLSearchParams({
        "form-name": "contact",
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-elegant">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-gold/10 border border-gold/20">
                <Sparkles className="w-8 h-8 text-gold" />
              </div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Create a <span className="text-gold">Stir</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's turn your story into something people can't stop talking about.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-lifted animate-fade-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your PR needs..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Calendly / Quick Contact */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold" />
                    Schedule a Consultation
                  </CardTitle>
                  <CardDescription>
                    Book a 30-minute strategy call to discuss your visibility goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Prefer to jump on a call? Schedule directly with Jennifer to explore how 
                    we can help amplify your story.
                  </p>
                  <Button 
                    id="book-call-button"
                    variant="outline" 
                    className="w-full transition-all duration-300" 
                    size="lg"
                    onClick={() => window.open('https://calendly.com/jpaire-yryw/consultation-call', '_blank')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Your Call
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Your availability will automatically display when visitors click to book.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-hero text-primary-foreground shadow-elegant">
                <CardContent className="pt-6">
                  <h3 className="font-serif text-2xl font-bold mb-4">
                    Why Choose Magnetic Media?
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>30+ years of journalism & PR expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>Relationship-driven approach with proven results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>Ethical, transparent, and always authentic</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
