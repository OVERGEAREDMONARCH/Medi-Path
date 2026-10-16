import { Link, useParams } from "react-router-dom";
import { Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientPageLayout } from "@/components/patient/PatientPageLayout";
import { medicalRecords } from "@/data/mock";
import { getDoctor } from "@/lib/patientStore";
import { formatDate } from "@/lib/format";
import { useAuth } from "@/contexts/AuthContext";

const RecordDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const record = medicalRecords.find((r) => r.id === id);

  if (!record) {
    return (
      <PatientPageLayout title="Record not found">
        <Button asChild><Link to="/patient-dashboard/records">Back to records</Link></Button>
      </PatientPageLayout>
    );
  }
  const doctor = getDoctor(record.doctorId);

  const download = () => {
    const text = [
      `Medi-Path record summary (demo data)`,
      ``,
      `Patient: ${user?.firstName} ${user?.lastName}`,
      `Record: ${record.title}`,
      `Category: ${record.category}`,
      `Date: ${formatDate(record.date)}`,
      `Clinician: ${doctor?.name} (${doctor?.specialty})`,
      ``,
      record.summary,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${record.title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PatientPageLayout title={record.title}>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2"><Badge variant="outline">{record.category}</Badge></div>
          <CardTitle className="text-lg">{formatDate(record.date)}</CardTitle>
          <CardDescription>{doctor?.name} — {doctor?.specialty}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">{record.summary}</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={download}><Download className="w-4 h-4 mr-2" />Download</Button>
            <Button variant="outline" asChild><Link to="/patient-dashboard/records">All records</Link></Button>
          </div>
        </CardContent>
      </Card>
    </PatientPageLayout>
  );
};

export default RecordDetail;
