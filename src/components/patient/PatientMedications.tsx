import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { medications } from "@/data/mock";

export const PatientMedications = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg md:text-xl">Current Medications</CardTitle>
      <CardDescription>Your active prescriptions and medication schedule</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      {medications.map((m) => (
        <div key={m.id} className="border border-border/20 rounded-lg p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1 flex-1">
            <p className="font-medium text-sm md:text-base">{m.name}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{m.schedule}</p>
          </div>
          <Badge variant="secondary" className="w-fit">{m.status}</Badge>
        </div>
      ))}
    </CardContent>
  </Card>
);
