import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, FileText, Phone, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { recentActivity } from "@/data/mock";
import { toneClasses } from "@/lib/format";

const quickActions = [
  { icon: Calendar, label: "Schedule New Appointment", to: "/patient-dashboard/appointments/new" },
  { icon: MessageCircle, label: "Message Your Doctor", to: "/patient-dashboard/messages" },
  { icon: FileText, label: "View Medical Records", to: "/patient-dashboard/records" },
  { icon: Bot, label: "Ask MedAssist", to: "/medassist" },
  { icon: Phone, label: "Contact Support", to: "/contact?topic=support" },
];

export const PatientOverview = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
        <CardDescription>Your latest medical interactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentActivity.map((a) => (
          <div key={a.title} className="flex items-start space-x-3">
            <div className={`w-2 h-2 ${toneClasses[a.tone].dot} rounded-full mt-2 flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm md:text-base truncate">{a.title}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
        <CardDescription>Common tasks and actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {quickActions.map((action) => (
          <Button key={action.label} asChild className="w-full justify-start text-sm" variant="outline">
            <Link to={action.to}>
              <action.icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{action.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  </div>
);
