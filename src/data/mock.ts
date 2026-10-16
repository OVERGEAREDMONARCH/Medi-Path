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
    linkTo: "/login?type=patient&redirect=/medassist",
    linkLabel: "Sign in to use MedAssist",
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

// ---------------------------------------------------------------------------
// Patient area mock data (all people are fictional demo accounts)
// ---------------------------------------------------------------------------

export type Role = "patient" | "provider";

export interface MockUser {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export type AppointmentStatus = "Upcoming" | "Scheduled";
export type AppointmentType = "video" | "in-person";

export interface Appointment {
  id: string;
  doctorId: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm (24h)
  reason: string;
  status: AppointmentStatus;
  type: AppointmentType;
}

export interface Medication {
  id: string;
  name: string;
  schedule: string;
  status: "Active";
}

export interface MedicalRecord {
  id: string;
  title: string;
  category: string;
  date: string; // yyyy-MM-dd
  doctorId: string;
  summary: string;
}

export interface ChatMessage {
  id: string;
  from: "patient" | "doctor";
  body: string;
  sentAt: string; // ISO
}

export interface Conversation {
  id: string;
  doctorId: string;
  messages: ChatMessage[];
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO
  read: boolean;
  link?: string;
}

export type ToneKey = "primary" | "secondary" | "accent";

export interface Activity {
  title: string;
  time: string;
  tone: ToneKey;
}

export const demoPassword = "MediPath2024!";

export const mockUsers: Record<Role, MockUser> = {
  patient: {
    id: "u-patient",
    role: "patient",
    firstName: "Demo",
    lastName: "Patient",
    email: "patient@medipath.com",
    phone: "+44 7700 900000",
  },
  provider: {
    id: "u-provider",
    role: "provider",
    firstName: "Demo",
    lastName: "Doctor",
    email: "provider@medipath.com",
    phone: "+44 7700 900001",
    specialty: "general-practice",
  },
};

export const specialties = [
  { value: "general-practice", label: "General Practice" },
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "neurology", label: "Neurology" },
  { value: "paediatrics", label: "Paediatrics" },
];

export const doctors: Doctor[] = [
  { id: "d1", name: "Demo Doctor A", specialty: "General Practice" },
  { id: "d2", name: "Demo Doctor B", specialty: "Cardiology" },
  { id: "d3", name: "Demo Doctor C", specialty: "Dermatology" },
];

export const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

export const initialAppointments: Appointment[] = [
  { id: "a1", doctorId: "d1", date: "2026-11-02", time: "10:30", reason: "Routine check-up", status: "Upcoming", type: "video" },
  { id: "a2", doctorId: "d2", date: "2026-11-16", time: "14:00", reason: "Blood pressure follow-up", status: "Scheduled", type: "in-person" },
];

export const medications: Medication[] = [
  { id: "m1", name: "Lisinopril 10mg", schedule: "Once daily with breakfast", status: "Active" },
  { id: "m2", name: "Metformin 500mg", schedule: "Twice daily with meals", status: "Active" },
  { id: "m3", name: "Vitamin D3 1000 IU", schedule: "Once daily", status: "Active" },
];

export const medicalRecords: MedicalRecord[] = [
  { id: "r1", title: "Blood Test Results", category: "Lab results", date: "2026-09-10", doctorId: "d1", summary: "Demo summary: full blood count within the expected range. This is example data only." },
  { id: "r2", title: "Chest X-Ray", category: "Imaging", date: "2026-08-28", doctorId: "d1", summary: "Demo summary: no abnormalities noted. This is example data only." },
  { id: "r3", title: "ECG Report", category: "Cardiology", date: "2026-07-30", doctorId: "d2", summary: "Demo summary: normal sinus rhythm. This is example data only." },
  { id: "r4", title: "Skin Check Letter", category: "Letters", date: "2026-06-15", doctorId: "d3", summary: "Demo summary: routine review, no follow-up needed. This is example data only." },
];

export const initialConversations: Conversation[] = [
  {
    id: "c1",
    doctorId: "d1",
    messages: [
      { id: "c1m1", from: "doctor", body: "Hello, your blood test results are now in your records.", sentAt: "2026-09-11T09:15:00Z" },
      { id: "c1m2", from: "patient", body: "Thank you, I'll take a look.", sentAt: "2026-09-11T10:02:00Z" },
    ],
  },
  {
    id: "c2",
    doctorId: "d2",
    messages: [
      { id: "c2m1", from: "doctor", body: "Please bring your blood pressure readings to your next appointment.", sentAt: "2026-10-01T14:30:00Z" },
    ],
  },
];

export const initialNotifications: AppNotification[] = [
  { id: "n1", title: "Appointment reminder", body: "You have an appointment with Demo Doctor A on 2 Nov at 10:30.", createdAt: "2026-10-12T08:00:00Z", read: false, link: "/patient-dashboard" },
  { id: "n2", title: "New message", body: "Demo Doctor B sent you a message.", createdAt: "2026-10-01T14:30:00Z", read: false, link: "/patient-dashboard/messages" },
  { id: "n3", title: "New record available", body: "Your blood test results have been added.", createdAt: "2026-09-10T16:00:00Z", read: true, link: "/patient-dashboard/records/r1" },
];

export const recentActivity: Activity[] = [
  { title: "Message from Demo Doctor B", time: "1 Oct 2026", tone: "primary" },
  { title: "Blood test results added", time: "10 Sept 2026", tone: "secondary" },
  { title: "Chest X-ray added", time: "28 Aug 2026", tone: "accent" },
];
