import { Button } from "@/components/ui/button";
import { Heart, Bell, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const PatientHeader = () => {
  return (
    <header className="bg-card border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Heart className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">Medi-Path</h1>
              <p className="text-xs text-muted-foreground">Patient Dashboard</p>
            </div>
          </Link>

          {/* User Actions */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Bell className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link to="/login">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="md:hidden">
              <Link to="/login">
                <LogOut className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};