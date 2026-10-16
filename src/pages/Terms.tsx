import LegalDoc, { type LegalSection } from "@/components/LegalDoc";

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      "These terms are the agreement between you and Medi-Path, run by [Owner: your full name or business name], for using the Medi-Path website and app. By creating an account or using Medi-Path, you agree to these terms. Please also read our Privacy Policy, which explains how we look after your information.",
      "Medi-Path is currently in a private beta. That means it's still being built and tested, some features are marked \"Coming soon\", and things may change as we improve it.",
    ],
  },
  {
    heading: "Medi-Path is not an emergency service",
    body: [
      "Never use Medi-Path for an emergency. Messages are not monitored in real time for urgent problems.",
      [
        "If someone is seriously ill or injured, or their life is at risk, call 999 or go to A&E.",
        "For urgent advice that isn't an emergency, call NHS 111 or visit 111.nhs.uk.",
        "If you're struggling with your mental health, call Samaritans on 116 123 or text SHOUT to 85258.",
      ],
    ],
  },
  {
    heading: "Medical information and MedAssist",
    body: [
      "Medi-Path helps you organise your care and communicate with your care team. It does not replace the professional judgement of your doctor, nurse or pharmacist.",
      "MedAssist gives general information about medicines, such as what they're usually used for, common warnings and how to store them. It does not diagnose conditions or give personal medical advice, and it may not cover every medicine or situation. Always follow your prescription and the leaflet in the box, and speak to a professional before starting, stopping or changing any medicine.",
    ],
  },
  {
    heading: "Your account",
    body: [
      [
        "You must be 18 or over to use Medi-Path during the beta.",
        "The information you give us must be accurate and kept up to date.",
        "Your account is for you only. Don't share your password, and don't let anyone else use your account.",
        "Tell us straight away if you think someone else has accessed your account.",
      ],
    ],
  },
  {
    heading: "Clinician accounts",
    body: [
      "Clinician accounts are approved individually by us. Clinicians remain fully responsible for their professional decisions and for following the rules of their professional body.",
      "Clinicians may only open the records of patients whose care team they belong to, and only for the purpose of providing care. All access is logged.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "When using Medi-Path you must not:",
      [
        "Break the law or use Medi-Path for anything fraudulent.",
        "Upload another person's information without their permission.",
        "Harass, abuse or threaten anyone, including clinicians and our team.",
        "Try to access accounts, records or parts of the system you're not allowed to, or interfere with how Medi-Path works.",
        "Copy or collect data from Medi-Path using automated tools.",
      ],
      "If you break these rules, we may suspend or close your account.",
    ],
  },
  {
    heading: "Your information and content",
    body: [
      "You own the information and files you add to Medi-Path. You give us permission to store and process them only so we can provide the service to you, as explained in our Privacy Policy.",
    ],
  },
  {
    heading: "Availability and changes to the service",
    body: [
      "We work hard to keep Medi-Path running, but during the beta we can't promise it will always be available or free of errors. We may need to pause it for maintenance, and we may add, change or remove features.",
      "Don't rely on Medi-Path as the only place you keep important health documents. Keep your own copies of anything you can't afford to lose.",
    ],
  },
  {
    heading: "Price",
    body: [
      "Medi-Path is free to use during the beta. If we ever introduce charges, we'll tell you well in advance, and you'll never be charged without agreeing to it first.",
    ],
  },
  {
    heading: "Our responsibility to you",
    body: [
      "Nothing in these terms limits our responsibility for death or personal injury caused by our negligence, for fraud, or for anything else that cannot be limited under UK law. Your legal rights as a consumer are not affected.",
      "Apart from that, because Medi-Path is a free beta service, we are not responsible for losses that were not foreseeable, or for losses caused by events outside our reasonable control, such as a wider internet or power failure.",
    ],
  },
  {
    heading: "Ending your account",
    body: [
      "You can stop using Medi-Path and ask us to delete your account at any time through the Contact page.",
      "We may suspend or close your account if you seriously or repeatedly break these terms. Where it's reasonable, we'll tell you first and explain why.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms as Medi-Path develops. We'll change the date at the top of this page, and if a change is significant, we'll tell you before it takes effect.",
    ],
  },
  {
    heading: "Which law applies",
    body: [
      "These terms are governed by the law of England and Wales. If you live in Scotland or Northern Ireland, you can also bring a claim in your local courts.",
    ],
  },
];

const Terms = () => (
  <LegalDoc
    title="Terms of Service"
    intro="The rules for using Medi-Path, written to be easy to read."
    updated="October 2026"
    sections={sections}
    contactTopic="legal"
    contactHeading="Questions about these terms?"
  />
);

export default Terms;
