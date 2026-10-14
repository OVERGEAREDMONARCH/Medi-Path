import { AlertTriangle } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { emergencyContacts } from "@/data/mock";

const Emergency = () => (
  <PageShell title="Emergency help" intro="Where to get help quickly in the UK.">
    <Alert variant="destructive" className="mb-8">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Medi-Path is not an emergency service</AlertTitle>
      <AlertDescription>Do not use Medi-Path or MedAssist in an emergency. If someone's life is at risk, call 999 now.</AlertDescription>
    </Alert>
    <div className="grid md:grid-cols-2 gap-6">
      {emergencyContacts.map((c) => (
        <Card key={c.title} className={c.urgent ? "border-destructive" : undefined}>
          <CardHeader><CardTitle className="text-xl">{c.title}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{c.when}</p>
            <div className="flex flex-wrap gap-3">
              {c.actions.map((a) => (
                <Button key={a.href} asChild variant={c.urgent ? "destructive" : "default"}>
                  <a href={a.href} {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{a.label}</a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </PageShell>
);

export default Emergency;
