import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FeatureIcon from "@/components/FeatureIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { howItWorksSteps } from "@/data/mock";

const HowItWorks = () => (
  <PageShell title="How it works" intro="Four simple steps to get started with Medi-Path.">
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {howItWorksSteps.map((s, i) => (
        <li key={s.title}>
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col h-full gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <FeatureIcon name={s.icon} className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-muted-foreground flex-1">{s.description}</p>
              <Button asChild variant="outline" size="sm"><Link to={s.linkTo}>{s.linkLabel}</Link></Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>
  </PageShell>
);

export default HowItWorks;
