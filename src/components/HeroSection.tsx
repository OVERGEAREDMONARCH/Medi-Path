import { Button } from "@/components/ui/button";
import { Play, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-healthcare.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-healthcare-light-blue via-background to-healthcare-light-green" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Now in Beta</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-relaxed">
                Modern Healthcare
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Management
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Streamline patient care with our comprehensive platform featuring appointment scheduling, 
                medication tracking, secure messaging, and telemedicine capabilities.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                onClick={() => navigate('/login?type=patient&redirect=/patient-dashboard/appointments/new')}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto group hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate('/how-it-works')}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up order-first lg:order-last">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-healthcare)]">
              <img 
                src={heroImage} 
                alt="Modern healthcare telemedicine platform"
                className="w-full h-auto object-cover min-h-[300px] sm:min-h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;