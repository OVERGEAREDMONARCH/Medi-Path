import { AlertTriangle, Activity, Clock, Pill, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { MedicationInfo } from "@/lib/medassist";

// Medication details shown inline inside a chat message.
// Warnings start open for safety; everything else is collapsed to keep the chat short.
const MedicationCard = ({ info }: { info: MedicationInfo }) => (
  <div className="mt-3 rounded-xl border border-border bg-background text-foreground">
    <div className="flex items-start gap-2 px-3 pt-3">
      <Pill className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
      <div>
        <p className="text-sm font-semibold">{info.medication}</p>
        <p className="text-xs text-muted-foreground">{info.info.what}</p>
      </div>
    </div>

    <Accordion type="multiple" defaultValue={["warnings"]} className="px-3">
      <AccordionItem value="uses">
        <AccordionTrigger className="py-2 text-xs">
          <span className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-secondary" />Common uses</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-1.5">
            {info.info.uses.map((u) => (
              <Badge key={u} variant="secondary" className="font-normal text-xs">{u}</Badge>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="dosage">
        <AccordionTrigger className="py-2 text-xs">
          <span className="flex items-center gap-2"><Pill className="w-3.5 h-3.5 text-primary" />General dosage</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
            {info.info.dosage.map((d) => <li key={d}>{d}</li>)}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground italic">Always follow the dose on your prescription.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="warnings">
        <AccordionTrigger className="py-2 text-xs">
          <span className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-destructive" />Warnings</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
            {info.info.warnings.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="interactions">
        <AccordionTrigger className="py-2 text-xs">
          <span className="flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5 text-destructive" />Interactions</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-1.5">
            {info.info.interactions.map((i) => (
              <Badge key={i} variant="outline" className="font-normal text-xs">{i}</Badge>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="storage" className="border-b-0">
        <AccordionTrigger className="py-2 text-xs">
          <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" />Storage</span>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-xs text-muted-foreground">{info.info.storage}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default MedicationCard;