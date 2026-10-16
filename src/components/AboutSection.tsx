import { Link } from "react-router-dom";
import { CalendarCheck, MessageSquare, Bot, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  { icon: CalendarCheck, title: "Book online", text: "Appointments without the phone queue." },
  { icon: MessageSquare, title: "Your care team", text: "Message the clinicians who know you." },
  { icon: Bot, title: "MedAssist", text: "Your medication, explained in plain English." },
  { icon: Lock, title: "Private by design", text: "Only your care team sees your records." },
];

const AboutSection = () => (
  <section id="about" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">About Medi-Path</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Less paperwork, clearer care</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Medi-Path lets patients handle the admin side of healthcare online: booking, preparing for appointments,
          keeping in touch with their care team and understanding their medication. It's in private beta in the UK.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {highlights.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardContent className="p-5 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button asChild variant="outline"><Link to="/about">Read more about us</Link></Button>
      </div>
    </div>
  </section>
);

export default AboutSection;