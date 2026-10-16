import { CheckCircle2, Clock } from "lucide-react";
import LegalDoc, { type LegalSection } from "@/components/LegalDoc";
import { Badge } from "@/components/ui/badge";
import { siteContact } from "@/data/mock";

type Status = "In place" | "In progress";

// Update each status to "In place" as it is completed during the backend build.
const protections: { title: string; text: string; status: Status }[] = [
  { title: "Encrypted connections", text: "Everything sent between your device and Medi-Path travels over HTTPS, so it can't be read by anyone in between.", status: "In progress" },
  { title: "Protected passwords", text: "Passwords are stored as one-way hashes, never as readable text. Repeated failed sign-ins are slowed down to stop guessing.", status: "In progress" },
  { title: "Care-team-only access", text: "Clinicians can only open the records of patients whose care team they belong to.", status: "In progress" },
  { title: "Access log", text: "Every time a record or conversation is opened, we record who opened it and when.", status: "In progress" },
  { title: "UK hosting", text: "Medi-Path runs on our own server in the United Kingdom. Your data, including backups, stays in the UK.", status: "In progress" },
  { title: "Regular backups", text: "Data is backed up regularly to a separate disk, so it can be restored if something goes wrong.", status: "In progress" },
  { title: "Hardened server", text: "Firewall, automatic security updates and key-only remote access on the server that runs Medi-Path.", status: "In progress" },
  { title: "Only what we need", text: "We collect only the information needed to run the service, and never use tracking or advertising tools.", status: "In place" },
];

const sections: LegalSection[] = [
  {
    heading: "How we approach security",
    body: [
      "Medi-Path handles health information, so security is built into how it works rather than added later. This page explains, honestly, what protects your information and what is still being finished during the beta.",
      "Protections marked \"In progress\" are being built and will be in place before the beta opens to testers. We'll update this page as each one is completed.",
    ],
  },
  {
    heading: "Keeping your account safe",
    body: [
      "Most security problems start with a stolen or guessed password. You can help by:",
      [
        "Using a strong password that you don't use for any other website.",
        "Never sharing your password with anyone, including family members.",
        "Signing out when you use a shared or public computer, and not ticking \"Remember me\" on it.",
        "Keeping your phone and computer up to date and locked with a PIN or password.",
      ],
      "We will never ask for your password by email, text or phone. If you get a message like that claiming to be from Medi-Path, don't reply, and let us know.",
    ],
  },
  {
    heading: "Reporting a security problem",
    body: [
      `If you think you've found a security weakness in Medi-Path, or that your account has been accessed by someone else, please contact us straight away at ${siteContact.email} or through the Contact page (choose "Security").`,
      "Please give us a chance to fix a weakness before telling anyone else about it. We'll acknowledge your report within 5 working days and keep you updated on what we're doing about it.",
    ],
  },
  {
    heading: "If something goes wrong",
    body: [
      "If a security incident affects your personal information, we'll tell you without undue delay, explain what happened and what we're doing about it, and report it to the Information Commissioner's Office where the law requires us to.",
    ],
  },
];

const Security = () => (
  <LegalDoc
    title="Security"
    intro="How we protect your information, and how you can help keep your account safe."
    updated="October 2026"
    sections={sections}
    contactTopic="security"
    contactHeading="Questions about security?"
  >
    <section className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">Our protections at a glance</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {protections.map((p) => (
          <div key={p.title} className="rounded-xl border border-border p-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{p.title}</h3>
              <Badge variant={p.status === "In place" ? "default" : "secondary"} className="shrink-0 gap-1">
                {p.status === "In place" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {p.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  </LegalDoc>
);

export default Security;
