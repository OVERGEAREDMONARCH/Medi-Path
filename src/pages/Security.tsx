import { ArrowLeft, Shield, Lock, Key, Eye, FileCheck, Server, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Security = () => {
  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted using AES-256 encryption both in transit and at rest.",
      status: "Active"
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Multi-Factor Authentication", 
      description: "Two-factor authentication required for all user accounts and admin access.",
      status: "Required"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "SOC 2 Type II Compliance",
      description: "Annual third-party security audits ensure compliance with industry standards.",
      status: "Certified"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Access Controls",
      description: "Role-based permissions and audit logs track all data access and changes.",
      status: "Monitored"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "HIPAA Compliance",
      description: "Full compliance with healthcare privacy regulations and Business Associate Agreements.",
      status: "Compliant"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Continuous Monitoring",
      description: "24/7 security monitoring with automated threat detection and response systems.",
      status: "24/7 Active"
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", status: "Current", year: "2024" },
    { name: "HIPAA BAA", status: "Compliant", year: "2024" },
    { name: "ISO 27001", status: "In Progress", year: "2024" },
    { name: "HITECH Act", status: "Compliant", year: "2024" }
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
              <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">Security</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Enterprise-Grade Security
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your health data deserves the highest level of protection. We implement industry-leading security 
                measures and maintain strict compliance with healthcare regulations.
              </p>
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Security Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{feature.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Certifications & Compliance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="border-border/50 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileCheck className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{cert.status}</p>
                    <p className="text-xs text-muted-foreground">{cert.year}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Incident Reporting */}
          <Card className="border-destructive/20 bg-destructive/5 mb-12">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center text-destructive flex-shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-destructive">Security Incident Reporting</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    If you discover a security vulnerability or suspect unauthorized access to your account, 
                    please report it immediately to our security team. We take all security reports seriously 
                    and investigate promptly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="destructive" asChild>
                      <a href="mailto:security@medipath.com?subject=Security Incident Report">
                        Report Security Issue
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/contact">Contact Security Team</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="border-border/50 bg-accent/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Our Security?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our security team is available to answer questions about our security practices, 
                compliance certifications, or to discuss enterprise security requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">Contact Security Team</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:security@medipath.com">security@medipath.com</a>
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

export default Security;