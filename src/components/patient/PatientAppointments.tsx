import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export const PatientAppointments = () => {
  const appointments = [
    {
      doctor: "Dr. Sarah Johnson - Cardiology",
      date: "Dec 15, 2024",
      time: "2:30 PM",
      status: "Upcoming",
      action: "Join Video Call"
    },
    {
      doctor: "Dr. Michael Brown - General Check-up",
      date: "Dec 20, 2024",
      time: "10:00 AM",
      status: "Scheduled",
      action: "Reschedule"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Your Appointments</CardTitle>
        <CardDescription>Upcoming and past medical appointments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="font-semibold text-foreground">Upcoming</h4>
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <div key={index} className="border border-border/20 rounded-lg p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                <div className="space-y-2">
                  <p className="font-medium text-sm md:text-base">{appointment.doctor}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <Badge variant="outline" className="w-fit">{appointment.status}</Badge>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    {appointment.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};