// All mock / placeholder content for Medi-Path lives here.
// Replace placeholders marked [Owner: ...] with real content.

export type FeatureStatus = "Available in beta" | "Coming soon";
export type IconKey =
  | "calendar" | "video" | "pill" | "message" | "bot" | "shield" | "user" | "lock";

export interface Feature {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
  details: string[];
  status: FeatureStatus;
}

export interface Step {
  icon: IconKey;
  title: string;
  description: string;
  linkTo: string;
  linkLabel: string;
}

export interface EmergencyContact {
  title: string;
  when: string;
  actions: { label: string; href: string }[];
  urgent?: boolean;
}

export interface ContactTopic {
  heading: string;
  description: string;
}

export interface Plan {
  name: string;
  description: string;
}

export interface Benefit {
  icon: IconKey;
  title: string;
  description: string;
}

export const siteContact = {
  email: "support@medipath.co.uk",
  phoneDisplay: "+44 0000 000000",
  phoneHref: "tel:+440000000000",
  address: "[Owner: add your business address]",
};

export const features: Feature[] = [
  {
    id: "scheduling",
    icon: "calendar",
    title: "Appointment Scheduling",
    description: "Book, reschedule and cancel appointments with your care provider.",
    details: ["Choose a date and time", "Appointment reminders", "Calendar export"],
    status: "Coming soon",
  },
  {
    id: "telemedicine",
    icon: "video",
    title: "Video Consultations",
    description: "Speak to a clinician from home over a secure video call.",
    details: ["Video and audio calls", "Join from phone or computer"],
    status: "Coming soon",
  },
  {
    id: "medications",
    icon: "pill",
    title: "Medication Tracking",
    description: "Keep a list of your medicines and when to take them.",
    details: ["Medication list", "Dose reminders", "Refill notes"],
    status: "Available in beta",
  },
  {
    id: "messaging",
    icon: "message",
    title: "Secure Messaging",
    description: "Message your care team and share documents.",
    details: ["Private conversations", "File attachments"],
    status: "Coming soon",
  },
  {
    id: "medassist",
    icon: "bot",
    title: "MedAssist",
    description:
      "Ask general questions about medicines or upload a photo of the packaging. General information only — not medical advice.",
    details: ["Chat questions", "Photo and PDF upload", "Plain-English summaries"],
    status: "Available in beta",
  },
  {
    id: "security",
    icon: "shield",
    title: "Privacy & Data Protection",
    description: "Built with UK GDPR and the Data Protection Act 2018 in mind.",
    details: ["Encrypted connections", "You control your data"],
    status: "Coming soon",
  },
];

export const howItWorksSteps: Step[] = [
  {
    icon: "user",
    title: "Create your account",
    description: "Sign up as a patient or healthcare provider in a few minutes.",
    linkTo: "/login?type=patient",
    linkLabel: "Create account",
  },
  {
    icon: "calendar",
    title: "Book an appointment",
    description: "Pick a provider, date and time that suits you.",
    linkTo: "/features#scheduling",
    linkLabel: "About scheduling",
  },
  {
    icon: "pill",
    title: "Track your medication",
    description: "Add your medicines and keep on top of doses.",
    linkTo: "/features#medications",
    linkLabel: "About medication tracking",
  },
  {
    icon: "bot",
    title: "Ask MedAssist",
    description: "Get general information about a medicine in plain English.",
    linkTo: "/medassist",
    linkLabel: "Open MedAssist",
  },
];

export const emergencyContacts: EmergencyContact[] = [
  {
    title: "999 — Life-threatening emergency",
    when: "Call 999 if someone is seriously ill or injured and their life is at risk, e.g. chest pain, difficulty breathing, severe bleeding, or loss of consciousness.",
    actions: [{ label: "Call 999", href: "tel:999" }],
    urgent: true,
  },
  {
    title: "A&E (Accident & Emergency)",
    when: "Go to your nearest A&E for serious injuries or illness that cannot wait. If you cannot travel safely, call 999.",
    actions: [{ label: "Find A&E on nhs.uk", href: "https://www.nhs.uk/service-search/find-an-accident-and-emergency-service" }],
  },
  {
    title: "NHS 111 — Urgent medical advice",
    when: "For urgent help that is not life-threatening, call 111 or use NHS 111 online. Available 24 hours a day.",
    actions: [
      { label: "Call 111", href: "tel:111" },
      { label: "Visit 111.nhs.uk", href: "https://111.nhs.uk" },
    ],
  },
  {
    title: "Mental health crisis",
    when: "If you are struggling or thinking about suicide, you can talk to someone now, any time of day or night.",
    actions: [
      { label: "Samaritans: 116 123", href: "tel:116123" },
      { label: "Text SHOUT to 85258", href: "sms:85258?body=SHOUT" },
    ],
  },
];

export const contactTopics: Record<string, ContactTopic> = {
  default: { heading: "Contact us", description: "Questions, feedback or support — we'd love to hear from you." },
  support: { heading: "Contact support", description: "Having trouble with your account or the app? Tell us what's happening." },
  privacy: { heading: "Contact our privacy team", description: "Questions about your data or UK GDPR rights." },
  legal: { heading: "Contact our legal team", description: "Questions about our terms of service." },
  security: { heading: "Contact our security team", description: "Report a security concern or ask about how we protect data." },
  demo: { heading: "Book a demo", description: "Tell us about your organisation and we'll arrange a walkthrough." },
};

export const aboutContent = {
  story: "[Owner: add your story here — why you started Medi-Path.]",
  mission: "[Owner: add your mission statement here.]",
  team: "[Owner: add information about your team here, if you wish.]",
};

export const productBenefits: Benefit[] = [
  { icon: "calendar", title: "Simple booking", description: "Find and book appointments without phone queues." },
  { icon: "pill", title: "Medication in one place", description: "Keep track of your medicines and doses." },
  { icon: "bot", title: "MedAssist", description: "Plain-English information about medicines." },
  { icon: "lock", title: "Privacy first", description: "Designed around UK GDPR and the Data Protection Act 2018." },
];

export const demoCredentials = {
  patient: { name: "Demo Patient", email: "patient@medipath.com" },
  provider: { name: "Demo Doctor", email: "provider@medipath.com" },
};
