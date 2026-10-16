import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { siteContact } from "@/data/mock";

const Footer = () => {
  return (
    <footer className="bg-card border-t py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Medi-Path</h3>
                <p className="text-sm text-muted-foreground">Healthcare Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Revolutionizing healthcare through technology, compassion, and innovation. 
              Connecting patients with providers for better health outcomes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link></li>
              <li><Link to="/emergency" className="text-destructive hover:underline transition-colors">Emergency help</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features#scheduling" className="text-muted-foreground hover:text-foreground transition-colors">Appointment Booking</Link></li>
              <li><Link to="/features#telemedicine" className="text-muted-foreground hover:text-foreground transition-colors">Telemedicine</Link></li>
              <li><Link to="/features#medications" className="text-muted-foreground hover:text-foreground transition-colors">Medication Tracking</Link></li>
              <li><Link to="/features#messaging" className="text-muted-foreground hover:text-foreground transition-colors">Secure Messaging</Link></li>
              <li><Link to="/features#medassist" className="text-muted-foreground hover:text-foreground transition-colors">MedAssist</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${siteContact.email}`} className="text-muted-foreground hover:text-foreground">{siteContact.email}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href={siteContact.phoneHref} className="text-muted-foreground hover:text-foreground">{siteContact.phoneDisplay}</a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{siteContact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Medi-Path. All rights reserved. Not an emergency service — in an emergency call 999.
          </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms of Service</Link>
              <Link to="/security" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Security</Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;