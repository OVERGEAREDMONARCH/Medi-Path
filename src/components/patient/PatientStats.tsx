import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Pill, Activity, FileText } from "lucide-react";

export const PatientStats = () => {
  const stats = [
    {
      icon: Calendar,
      value: "2",
      label: "Upcoming Appointments",
      color: "primary"
    },
    {
      icon: Pill,
      value: "3",
      label: "Active Medications",
      color: "secondary"
    },
    {
      icon: Activity,
      value: "98%",
      label: "Health Score",
      color: "accent"
    },
    {
      icon: FileText,
      value: "8",
      label: "Medical Records",
      color: "primary"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <div className={`w-10 h-10 md:w-12 md:h-12 bg-${stat.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}`} />
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