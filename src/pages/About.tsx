import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { aboutContent } from "@/data/mock";

const About = () => {
  const blocks = [
    { title: "Our story", body: aboutContent.story },
    { title: "Our mission", body: aboutContent.mission },
    { title: "Our team", body: aboutContent.team },
  ];
  return (
    <PageShell title="About Medi-Path" intro="A healthcare platform in beta, built for patients and providers in the UK.">
      <div className="grid md:grid-cols-3 gap-6">
        {blocks.map((b) => (
          <Card key={b.title}>
            <CardHeader><CardTitle>{b.title}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground italic">{b.body}</p></CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button asChild><Link to="/contact">Get in touch</Link></Button>
        <Button asChild variant="outline"><Link to="/how-it-works">How it works</Link></Button>
      </div>
    </PageShell>
  );
};

export default About;
