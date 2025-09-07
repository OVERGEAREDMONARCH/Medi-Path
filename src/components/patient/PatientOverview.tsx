import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Download, Phone } from "lucide-react";

export const PatientOverview = () => {
  const activities = [
    {
      title: "Appointment with Dr. Smith",
      time: "Yesterday, 2:00 PM",
      color: "primary"
    },
    {
      title: "Lab results uploaded",
      time: "2 days ago",
      color: "secondary"
    },
    {
      title: "Prescription refilled",
      time: "3 days ago",
      color: "accent"
    }
  ];

  const quickActions = [
    {
      icon: Calendar,
      label: "Schedule New Appointment"
    },
    {
      icon: MessageCircle,
      label: "Message Your Doctor"
    },
    {
      icon: Download,
      label: "Download Medical Records"
    },
    {
      icon: Phone,
      label: "Contact Support"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
          <CardDescription>Your latest medical interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 bg-${activity.color} rounded-full mt-2 flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm md:text-base truncate">{activity.title}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{activity.time}</p>
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
          {quickActions.map((action, index) => (
            <Button key={index} className="w-full justify-start text-sm" variant="outline">
              <action.icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{action.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};