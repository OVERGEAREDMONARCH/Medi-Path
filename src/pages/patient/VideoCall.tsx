import { Link, useParams } from "react-router-dom";
import { Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientPageLayout } from "@/components/patient/PatientPageLayout";
import { getDoctor, usePatientStore } from "@/lib/patientStore";
import { formatDate } from "@/lib/format";

const VideoCall = () => {
  const { id } = useParams();
  const appt = usePatientStore().appointments.find((a) => a.id === id);
  const doctor = appt ? getDoctor(appt.doctorId) : undefined;

  return (
    <PatientPageLayout title="Video waiting room">
      <Card>
        <CardContent className="p-6 md:p-10 flex flex-col items-center text-center gap-4">
          <div className="w-full max-w-lg aspect-video rounded-lg bg-muted flex items-center justify-center">
            <Video className="w-12 h-12 text-muted-foreground" />
          </div>
          <Badge variant="secondary">Coming soon</Badge>
          <h3 className="text-xl font-semibold text-foreground">Video consultations are coming soon</h3>
          {appt && (
            <p className="text-muted-foreground">
              Your appointment with {doctor?.name} is on {formatDate(appt.date)} at {appt.time}.
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            In an emergency call 999. For urgent advice call NHS 111.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild><Link to="/patient-dashboard/messages">Message your doctor</Link></Button>
            <Button variant="outline" asChild><Link to="/patient-dashboard">Back to dashboard</Link></Button>
          </div>
        </CardContent>
      </Card>
    </PatientPageLayout>
  );
};

export default VideoCall;
