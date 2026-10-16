import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { startOfDay, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { PatientPageLayout } from "@/components/patient/PatientPageLayout";
import { timeSlots } from "@/data/mock";
import { getDoctor, isSlotTaken, rescheduleAppointment, usePatientStore } from "@/lib/patientStore";
import { formatDate, toISODate } from "@/lib/format";
import { useToast } from "@/hooks/use-toast";

const RescheduleAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const appt = usePatientStore().appointments.find((a) => a.id === id);
  const [date, setDate] = useState<Date | undefined>(appt ? parseISO(appt.date) : undefined);
  const [time, setTime] = useState(appt?.time ?? "");
  const [error, setError] = useState("");

  if (!appt) {
    return (
      <PatientPageLayout title="Appointment not found">
        <Button asChild><Link to="/patient-dashboard">Back to dashboard</Link></Button>
      </PatientPageLayout>
    );
  }
  const doctor = getDoctor(appt.doctorId);

  const save = () => {
    if (!date || !time) return setError("Please choose a new date and time.");
    if (isSlotTaken(appt.doctorId, toISODate(date), time, appt.id)) return setError("That slot is already booked.");
    rescheduleAppointment(appt.id, toISODate(date), time);
    toast({ title: "Appointment rescheduled", description: `Now on ${formatDate(toISODate(date))} at ${time}.` });
    navigate("/patient-dashboard");
  };

  return (
    <PatientPageLayout title="Reschedule appointment">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Current booking</CardTitle>
          <CardDescription>{doctor?.name} — {doctor?.specialty}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {formatDate(appt.date)} at {appt.time} · {appt.reason}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 md:p-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>New date</Label>
            <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setError(""); }}
              disabled={(d) => d < startOfDay(new Date()) || d.getDay() === 0 || d.getDay() === 6}
              className="rounded-md border w-fit pointer-events-auto" />
          </div>
          <div className="space-y-2">
            <Label>New time</Label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((t) => (
                <Button key={t} type="button" size="sm" variant={time === t ? "default" : "outline"}
                  disabled={!!date && isSlotTaken(appt.doctorId, toISODate(date), t, appt.id)}
                  onClick={() => { setTime(t); setError(""); }}>{t}</Button>
              ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigate("/patient-dashboard")}>Cancel</Button>
            <Button onClick={save}>Save new time</Button>
          </div>
        </CardContent>
      </Card>
    </PatientPageLayout>
  );
};

export default RescheduleAppointment;
