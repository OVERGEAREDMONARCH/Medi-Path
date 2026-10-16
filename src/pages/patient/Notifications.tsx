import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientPageLayout } from "@/components/patient/PatientPageLayout";
import { markAllNotificationsRead, markNotificationRead, usePatientStore } from "@/lib/patientStore";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const { notifications } = usePatientStore();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <PatientPageLayout title="Notifications" description={`${unread} unread`}>
      <div className="flex justify-end mb-3">
        <Button size="sm" variant="outline" disabled={unread === 0} onClick={markAllNotificationsRead}>Mark all as read</Button>
      </div>
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className={cn(!n.read && "border-primary/40")}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{n.title}</p>
                  {!n.read && <Badge>New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{n.body}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDateTime(n.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                {n.link && <Button size="sm" variant="outline" asChild><Link to={n.link} onClick={() => markNotificationRead(n.id)}>View</Link></Button>}
                {!n.read && <Button size="sm" onClick={() => markNotificationRead(n.id)}>Mark as read</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PatientPageLayout>
  );
};

export default Notifications;
