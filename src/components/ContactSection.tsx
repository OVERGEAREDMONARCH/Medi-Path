import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, MessageSquare, HeartHandshake, AlertTriangle, Shield } from "lucide-react";
import { siteContact } from "@/data/mock";
import { useToast } from "@/hooks/use-toast";

const ContactSection = ({ description }: { description?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // capture now: React clears currentTarget after this handler returns
    setIsLoading(true);

    const formData = new FormData(form);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      
      if (data.firstName && data.lastName && data.email && data.subject && data.message) {
        toast({
          title: "Message sent successfully!",
          description: "We aim to reply within 2 working days.",
        });
        
        // Reset form
        form.reset();
      } else {
        toast({
          title: "Please fill in all fields",
          description: "All fields are required to send your message.",
          variant: "destructive"
        });
      }
    }, 1500);
  };
    const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "Best for most questions",
      contact: siteContact.email,
      href: `mailto:${siteContact.email}`,
      availability: "We aim to reply within 2 working days"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "With your doctor or care team",
      contact: "Sign in to chat",
      href: "/login?type=patient&redirect=/patient-dashboard/messages",
      availability: "Coming soon · for signed-in patients"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      description: "Not for medical emergencies",
      contact: siteContact.phoneDisplay,
      href: siteContact.phoneHref,
      availability: "Mon–Fri, 9am–5pm"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Postal address",
      description: "Post only, no walk-in appointments",
      contact: siteContact.address,
      href: undefined,
      availability: "Letters answered within 10 working days"
    }
  ];

    const supportTypes = [
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Patient Support",
      description: "Help with your account, appointments or using the app"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy & Your Data",
      description: "Ask what we hold about you, or request a copy or deletion (UK GDPR)"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "General Enquiries",
      description: "Questions about Medi-Path, feedback or ideas"
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">Contact Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            We're Here to Help
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description ??
              "Questions, feedback or support? We'd love to hear from you. Get in touch about your account, the app, or your data and we'll help however we can."}
          </p>
        </div>

        {/* Support Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportTypes.map((type, index) => (
            <Card key={index} className="border-border/50 text-center hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {type.icon}
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {type.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form and Methods */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input name="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input name="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input name="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input name="subject" placeholder="How can we help you?" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <p className="flex items-start gap-2 text-sm text-destructive">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Don't use this form for urgent medical problems. For chest pain, difficulty
                  breathing or any emergency, call 999. For urgent advice, call NHS 111.
                </p>

                <Button 
                  type="submit" 
                  className="w-full text-base py-3 hover:scale-[1.02] transition-all duration-200" 
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                Choose the contact method that works best for you. Our team is committed to providing 
                prompt and helpful responses to all inquiries.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{method.title}</h4>
                        <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                        {method.href?.startsWith("/") ? (
                          <Link to={method.href} className="font-medium text-primary mb-1 block hover:underline">
                            {method.contact}
                          </Link>
                        ) : method.href ? (
                          <a href={method.href} className="font-medium text-foreground mb-1 block hover:text-primary">
                            {method.contact}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground mb-1">{method.contact}</p>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {method.availability}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

                        {/* Emergency Notice */}
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center text-destructive flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg text-destructive">Medical Emergency?</h4>
                    <p className="text-sm text-muted-foreground">
                      Medi-Path is not an emergency service.
                    </p>
                    <p className="text-sm text-foreground">
                      If someone is seriously ill or injured, or their life is at risk, call{" "}
                      <a href="tel:999" className="font-bold text-destructive underline">999</a>{" "}
                      or go to A&amp;E.
                    </p>
                    <p className="text-sm text-foreground">
                      For urgent advice that isn't an emergency, call{" "}
                      <a href="tel:111" className="font-bold underline">NHS 111</a>{" "}
                      or visit{" "}
                      <a
                        href="https://111.nhs.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline"
                      >
                        111.nhs.uk
                      </a>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;