import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PatientPageLayout } from "@/components/patient/PatientPageLayout";
import { getDoctor, sendMessage, usePatientStore } from "@/lib/patientStore";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const schema = z.object({ body: z.string().trim().min(1, "Type a message").max(1000, "Keep it under 1000 characters") });

const Messages = () => {
  const { conversations } = usePatientStore();
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const active = conversations.find((c) => c.id === activeId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ body: string }>({ resolver: zodResolver(schema) });

  const onSubmit = ({ body }: { body: string }) => {
    if (!active) return;
    sendMessage(active.id, body);
    reset({ body: "" });
  };

  return (
    <PatientPageLayout title="Messages" description="Demo only — messages stay on this device and are not sent to anyone.">
      <Badge variant="secondary" className="mb-4">Secure messaging coming soon</Badge>
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <Card>
          <CardContent className="p-2 space-y-1">
            {conversations.map((c) => {
              const d = getDoctor(c.doctorId);
              const last = c.messages[c.messages.length - 1];
              return (
                <button key={c.id} onClick={() => setActiveId(c.id)}
                  className={cn("w-full text-left rounded-md p-3 hover:bg-muted", c.id === activeId && "bg-muted")}>
                  <p className="font-medium text-sm text-foreground">{d?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{last?.body}</p>
                </button>
              );
            })}
          </CardContent>
        </Card>
        <Card className="flex flex-col min-h-[420px]">
          <CardContent className="p-4 flex-1 space-y-3 overflow-y-auto max-h-[60vh]">
            {active?.messages.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "patient" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  m.from === "patient" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
                  <p>{m.body}</p>
                  <p className="text-[10px] opacity-70 mt-1">{formatDateTime(m.sentAt)}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="border-t p-3">
            <div className="flex gap-2">
              <Input {...register("body")} placeholder="Write a message…" aria-label="Message" />
              <Button type="submit" aria-label="Send"><Send className="w-4 h-4" /></Button>
            </div>
            {errors.body && <p className="text-sm text-destructive mt-1">{errors.body.message}</p>}
          </form>
        </Card>
      </div>
    </PatientPageLayout>
  );
};

export default Messages;
