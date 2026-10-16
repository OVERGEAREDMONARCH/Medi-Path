import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Bell, Shield, Lock, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { specialties } from "@/data/mock";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(50),
  lastName: z.string().trim().min(1, "Enter your last name").max(50),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(10, "Enter a UK phone number, e.g. +44 7700 900123").max(20),
  specialty: z.string().optional(),
});
type Values = z.infer<typeof schema>;

const notificationPrefs = [
  { label: "Appointment reminders", description: "Get notified about upcoming appointments" },
  { label: "New messages", description: "When your care team sends a message" },
  { label: "New records", description: "When a new document is added" },
];

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const isProvider = user?.role === "provider";
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isOpen && user) reset({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, specialty: user.specialty });
  }, [isOpen, user, reset]);

  const onSave = (v: Values) => {
    updateUser(isProvider ? v : { firstName: v.firstName, lastName: v.lastName, email: v.email, phone: v.phone });
    toast({ title: "Settings saved", description: "Your details have been updated." });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Shield className="w-5 h-5" />Settings</DialogTitle>
          <DialogDescription>Manage your account details and preferences</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSave)}>
          <Tabs defaultValue="profile" className="mt-4">
            <TabsList className="grid w-full grid-cols-3 h-auto rounded-lg border bg-muted/50 p-1">
              <TabsTrigger value="profile" className="gap-2 text-xs sm:text-sm py-2"><User className="w-4 h-4" />Profile</TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 text-xs sm:text-sm py-2"><Bell className="w-4 h-4" />Alerts</TabsTrigger>
              <TabsTrigger value="security" className="gap-2 text-xs sm:text-sm py-2"><Lock className="w-4 h-4" />Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal information</CardTitle>
                  <CardDescription>Your details as shown on Medi-Path</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="set-first">First name</Label>
                      <Input id="set-first" {...register("firstName")} />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="set-last">Last name</Label>
                      <Input id="set-last" {...register("lastName")} />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="set-email">Email</Label>
                    <Input id="set-email" type="email" {...register("email")} />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="set-phone">Phone number</Label>
                    <Input id="set-phone" type="tel" placeholder="+44 7700 900123" {...register("phone")} />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                  {isProvider && (
                    <div className="space-y-2">
                      <Label>Medical specialty</Label>
                      <Controller control={control} name="specialty" render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Choose specialty" /></SelectTrigger>
                          <SelectContent>
                            {specialties.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Notification preferences <Badge variant="secondary">Coming soon</Badge></CardTitle>
                  <CardDescription>Email and push notifications are not sent yet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notificationPrefs.map((p) => (
                    <div key={p.label} className="flex items-center justify-between gap-4">
                      <div>
                        <Label>{p.label}</Label>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                      <Switch disabled defaultChecked aria-label={p.label} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Password &amp; security <Badge variant="secondary">Coming soon</Badge></CardTitle>
                  <CardDescription>Changing your password and two-step sign-in will be available once real accounts launch.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="gap-2"><Save className="w-4 h-4" />Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
