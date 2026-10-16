import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bell, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useAuth } from "@/contexts/AuthContext";
import { usePatientStore } from "@/lib/patientStore";
import { useToast } from "@/hooks/use-toast";

export const PatientHeader = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const unread = usePatientStore().notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    toast({ title: "Signed out", description: "You have been signed out." });
    navigate("/login");
  };

  return (
    <header className="bg-card border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Heart className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">Medi-Path</h1>
              <p className="text-xs text-muted-foreground">Patient Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center space-x-1 md:space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/patient-dashboard/notifications" aria-label="Notifications" className="relative">
                <Bell className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Notifications</span>
                {unread > 0 && (
                  <span className="ml-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5">{unread}</span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)} aria-label="Settings">
              <Settings className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} aria-label="Logout">
              <LogOut className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </header>
  );
};
