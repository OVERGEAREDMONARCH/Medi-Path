import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageShell from "@/components/PageShell";
import FeatureIcon from "@/components/FeatureIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/mock";

const Features = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <PageShell title="Features" intro="What Medi-Path offers today, and what's on the way.">
      <div className="space-y-6">
        {features.map((f) => (
          <section key={f.id} id={f.id} className="scroll-mt-24">
            <Card>
              <CardContent className="p-6 flex flex-col sm:flex-row gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FeatureIcon name={f.icon} className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold">{f.title}</h2>
                    <Badge variant={f.status === "Available in beta" ? "default" : "secondary"}>{f.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{f.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    {f.details.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" /> {d}
                      </li>
                    ))}
                  </ul>
                  {f.id === "medassist" && (
                    <Button asChild size="sm"><Link to="/medassist">Try MedAssist</Link></Button>
                  )}
                  {f.id === "medications" && (
                    <Button asChild size="sm" variant="outline"><Link to="/login?type=patient">Sign in to try it</Link></Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        ))}
      </div>
    </PageShell>
  );
};

export default Features;
