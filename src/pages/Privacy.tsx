import { ArrowLeft, Shield, Lock, Eye, FileText, Users, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect personal health information, contact details, appointment data, and usage analytics to provide our healthcare services effectively and securely."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "How We Use Your Information", 
      content: "Your data is used to facilitate healthcare services, schedule appointments, communicate with providers, process payments, and improve our platform's functionality."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Protection & Security",
      content: "We employ enterprise-grade encryption, secure servers, regular security audits, and strict access controls to protect your sensitive health information."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Information Sharing",
      content: "We only share information with your healthcare providers, insurance companies (with consent), and necessary service providers under strict confidentiality agreements."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Your Rights & Choices",
      content: "You have the right to access, update, delete, or port your data. You can also control marketing communications and data sharing preferences."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "HIPAA Compliance",
      content: "As a healthcare platform, we strictly adhere to HIPAA regulations and maintain Business Associate Agreements with all third-party services."
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
              <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">Privacy Policy</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Privacy Matters
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We are committed to protecting your personal and health information. This policy explains how we collect, 
                use, and safeguard your data in compliance with HIPAA and other privacy regulations.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: January 2024
              </p>
            </div>
          </div>

          {/* Privacy Sections */}
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

          {/* Contact Section */}
          <Card className="border-border/50 bg-accent/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have questions about this privacy policy or how we handle your data, 
                please don't hesitate to contact our privacy team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">Contact Privacy Team</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:privacy@medipath.com">privacy@medipath.com</a>
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

export default Privacy;