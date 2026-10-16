import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientPageLayout } from "@/components/patient/PatientPageLayout";
import { medicalRecords } from "@/data/mock";
import { formatDate } from "@/lib/format";

const Records = () => {
  const [q, setQ] = useState("");
  const results = medicalRecords.filter((r) =>
    `${r.title} ${r.category}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <PatientPageLayout title="Medical records" description="Search and view your documents.">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search records" className="pl-10" aria-label="Search records" />
      </div>
      <div className="space-y-3">
        {results.length === 0 && <p className="text-muted-foreground text-sm">No records match “{q}”.</p>}
        {results.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-foreground">{r.title}</p>
                <p className="text-sm text-muted-foreground">{formatDate(r.date)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{r.category}</Badge>
                <Button size="sm" variant="outline" asChild><Link to={`/patient-dashboard/records/${r.id}`}>View</Link></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PatientPageLayout>
  );
};

export default Records;
