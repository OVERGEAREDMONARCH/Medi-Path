import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/50 dark:border-white/30 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/50 dark:border-white/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/50 dark:border-white/30 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to Start Your
            <span className="block">Healthcare Journey?</span>
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Medi-Path is in beta. Create an account to try the features available today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-8 max-w-md mx-auto">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 border-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto transition-all duration-200"
              onClick={() => navigate('/login?type=patient')}
            >
              For Patients
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent text-white border-white hover:bg-white/20 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto transition-all duration-200"
              onClick={() => navigate('/login?type=provider')}
            >
              For Providers
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;