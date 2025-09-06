import { ArrowLeft, FileText, Users, Shield, AlertTriangle, Scale, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Responsibilities",
      content: "Users must provide accurate information, maintain account security, use the platform responsibly, and comply with healthcare regulations and professional standards."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Platform Usage", 
      content: "Our platform is for legitimate healthcare purposes only. Prohibited uses include sharing false information, attempting unauthorized access, or using the service for illegal activities."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Medical Disclaimer",
      content: "This platform facilitates healthcare services but does not replace professional medical judgment. Always seek immediate medical attention for emergencies."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Liability & Limitations",
      content: "Our liability is limited to the extent permitted by law. We provide the platform 'as is' and users assume responsibility for their healthcare decisions."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Intellectual Property",
      content: "All platform content, including software, designs, and trademarks, are owned by Medi-Path. Users retain ownership of their personal health information."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Termination & Modifications",
      content: "We may modify these terms or terminate accounts for violations. Users can delete their accounts at any time with proper notice and data export options."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>
            
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">Terms of Service</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                By using Medi-Path, you agree to these terms and conditions. Please read them carefully as they 
                govern your use of our healthcare platform and services.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Effective Date: January 2024 | Last updated: January 2024
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {sections.map((section, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Agreement Section */}
          <Card className="border-border/50 bg-accent/5 mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Agreement and Acceptance</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing or using Medi-Path, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                <p>
                  These terms constitute a legally binding agreement between you and Medi-Path. If you do not agree with any part of these terms, you must not use our services.
                </p>
                <p className="font-medium text-foreground">
                  For healthcare providers: Additional professional licensing and certification requirements apply.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="border-border/50 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have questions about these terms of service or need clarification on any provisions, 
                our legal team is available to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">Contact Legal Team</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:legal@medipath.com">legal@medipath.com</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;