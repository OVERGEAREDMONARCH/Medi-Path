import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getDoctor, usePatientStore } from "@/lib/patientStore";
import { formatDate } from "@/lib/format";

export const PatientAppointments = () => {
  const { appointments } = usePatientStore();

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-lg md:text-xl">Your Appointments</CardTitle>
          <CardDescription>Upcoming medical appointments</CardDescription>
        </div>
        <Button size="sm" asChild>
          <Link to="/patient-dashboard/appointments/new"><Plus className="w-4 h-4 mr-1" />Book</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments.length === 0 && <p className="text-sm text-muted-foreground">No upcoming appointments.</p>}
        {appointments.map((a) => {
          const doctor = getDoctor(a.doctorId);
          return (
            <div key={a.id} className="border border-border/20 rounded-lg p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-2">
                  <p className="font-medium text-sm md:text-base">{doctor?.name} — {doctor?.specialty}</p>
                  <p className="text-sm text-muted-foreground">{a.reason} · {a.type === "video" ? "Video" : "In person"}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{formatDate(a.date)}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{a.time}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{a.status}</Badge>
                  {a.type === "video" && (
                    <Button size="sm" asChild><Link to={`/patient-dashboard/appointments/${a.id}/call`}>Join Video Call</Link></Button>
                  )}
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/patient-dashboard/appointments/${a.id}/reschedule`}>Reschedule</Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
