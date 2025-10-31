import { Sparkles, Mail, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-gold" />
                <span className="font-serif text-xl font-bold">M3 Media</span>
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Creating a stir with stories that inspire trust and visibility.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:hello@magneticmedia.com" 
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@magneticmedia.com
                </a>
                <div className="flex gap-4 pt-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-foreground/10 text-center">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Magnetic Media & Messaging. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/50 mt-2">
              Helping entrepreneurs become less of a well-kept secret.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
