import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientPageLayout } from "@/components/patient/PatientPageLayout";
import { doctors, timeSlots } from "@/data/mock";
import { addAppointment, isSlotTaken } from "@/lib/patientStore";
import { toISODate } from "@/lib/format";
import { useToast } from "@/hooks/use-toast";
import { startOfDay } from "date-fns";

const schema = z.object({
  doctorId: z.string().min(1, "Please choose a doctor"),
  date: z.date({ required_error: "Please choose a date" }),
  time: z.string().min(1, "Please choose a time"),
  type: z.enum(["video", "in-person"]),
  reason: z.string().trim().min(3, "Please give a short reason").max(300, "Keep it under 300 characters"),
});
type Values = z.infer<typeof schema>;

const NewAppointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { control, register, handleSubmit, watch, setError, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { doctorId: "", time: "", type: "video", reason: "" },
  });
  const doctorId = watch("doctorId");
  const date = watch("date");

  const onSubmit = (v: Values) => {
    const d = toISODate(v.date);
    if (isSlotTaken(v.doctorId, d, v.time)) {
      setError("time", { message: "That slot is already booked — please pick another" });
      return;
    }
    addAppointment({ doctorId: v.doctorId, date: d, time: v.time, reason: v.reason, type: v.type });
    toast({ title: "Appointment booked", description: "Your appointment has been added." });
    navigate("/patient-dashboard");
  };

  return (
    <PatientPageLayout title="Book an appointment" description="Choose a doctor, date and time.">
      <Card>
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Controller control={control} name="doctorId" render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Choose a doctor" /></SelectTrigger>
                    <SelectContent>
                      {doctors.map((d) => <SelectItem key={d.id} value={d.id}>{d.name} — {d.specialty}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )} />
                {errors.doctorId && <p className="text-sm text-destructive">{errors.doctorId.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Appointment type</Label>
                <Controller control={control} name="type" render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video (coming soon)</SelectItem>
                      <SelectItem value="in-person">In person</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Controller control={control} name="time" render={({ field }) => (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => {
                      const taken = !!doctorId && !!date && isSlotTaken(doctorId, toISODate(date), t);
                      return (
                        <Button key={t} type="button" size="sm" disabled={taken}
                          variant={field.value === t ? "default" : "outline"} onClick={() => field.onChange(t)}>
                          {t}
                        </Button>
                      );
                    })}
                  </div>
                )} />
                {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for visit</Label>
                <Textarea id="reason" {...register("reason")} placeholder="Briefly describe why you'd like to be seen" />
                {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Controller control={control} name="date" render={({ field }) => (
                <Calendar mode="single" selected={field.value} onSelect={field.onChange}
                  disabled={(d) => d < startOfDay(new Date()) || d.getDay() === 0 || d.getDay() === 6}
                  className="rounded-md border w-fit pointer-events-auto" />
              )} />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate("/patient-dashboard")}>Cancel</Button>
              <Button type="submit">Book appointment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PatientPageLayout>
  );
};

export default NewAppointment;
