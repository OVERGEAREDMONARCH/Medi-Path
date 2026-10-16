import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Pill, Bell, FileText } from "lucide-react";
import { medications, medicalRecords } from "@/data/mock";
import { usePatientStore } from "@/lib/patientStore";
import { toneClasses } from "@/lib/format";

export const PatientStats = () => {
  const { appointments, notifications } = usePatientStore();
  const stats = [
    { icon: Calendar, value: appointments.length, label: "Upcoming Appointments", tone: "primary" as const },
    { icon: Pill, value: medications.length, label: "Active Medications", tone: "secondary" as const },
    { icon: Bell, value: notifications.filter((n) => !n.read).length, label: "Unread Notifications", tone: "accent" as const },
    { icon: FileText, value: medicalRecords.length, label: "Medical Records", tone: "primary" as const },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <div className={`w-10 h-10 md:w-12 md:h-12 ${toneClasses[stat.tone].soft} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${toneClasses[stat.tone].text}`} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-xs md:text-sm leading-tight">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
