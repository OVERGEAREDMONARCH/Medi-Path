import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { medicalRecords } from "@/data/mock";
import { formatDate } from "@/lib/format";

export const PatientRecords = () => (
  <Card>
    <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
      <div>
        <CardTitle className="text-lg md:text-xl">Medical Records</CardTitle>
        <CardDescription>Your health history and documents</CardDescription>
      </div>
      <Button size="sm" variant="outline" asChild><Link to="/patient-dashboard/records">View all</Link></Button>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {medicalRecords.map((r) => (
          <div key={r.id} className="border border-border/20 rounded-lg p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <p className="font-medium text-sm md:text-base">{r.title}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{formatDate(r.date)}</p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link to={`/patient-dashboard/records/${r.id}`}><Download className="w-4 h-4 mr-2" />Download</Link>
            </Button>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
