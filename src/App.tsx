import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Loader from "@/components/Loader";
import MedAssistWidget from "@/components/MedAssistWidget";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ProductInfo from "./pages/ProductInfo";
import PatientDashboard from "./pages/PatientDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import MedAssist from "./pages/MedAssist";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Emergency from "./pages/Emergency";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NewAppointment from "./pages/patient/NewAppointment";
import RescheduleAppointment from "./pages/patient/RescheduleAppointment";
import VideoCall from "./pages/patient/VideoCall";
import Messages from "./pages/patient/Messages";
import Records from "./pages/patient/Records";
import RecordDetail from "./pages/patient/RecordDetail";
import Notifications from "./pages/patient/Notifications";

const SignedInWidget = () => (useAuth().user ? <MedAssistWidget /> : null);

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product-info" element={<ProductInfo />} />
              <Route element={<ProtectedRoute role="patient" />}>
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/patient-dashboard/appointments/new" element={<NewAppointment />} />
                <Route path="/patient-dashboard/appointments/:id/reschedule" element={<RescheduleAppointment />} />
                <Route path="/patient-dashboard/appointments/:id/call" element={<VideoCall />} />
                <Route path="/patient-dashboard/messages" element={<Messages />} />
                <Route path="/patient-dashboard/records" element={<Records />} />
                <Route path="/patient-dashboard/records/:id" element={<RecordDetail />} />
                <Route path="/patient-dashboard/notifications" element={<Notifications />} />
                <Route path="/medassist" element={<MedAssist />} />
              </Route>
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <SignedInWidget />
          </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
