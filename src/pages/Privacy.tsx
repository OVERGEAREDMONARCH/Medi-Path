import LegalDoc, { type LegalSection } from "@/components/LegalDoc";
import { siteContact } from "@/data/mock";

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "Medi-Path is run by [Owner: your full name or business name], an independent developer based in the United Kingdom. For data protection purposes, we are the \"controller\" of your personal information, which means we decide how and why it is used and we are responsible for looking after it.",
      `You can contact us about anything in this policy at ${siteContact.email} or through our Contact page.`,
    ],
  },
  {
    heading: "What this policy covers",
    body: [
      "This policy explains what information we collect when you use the Medi-Path website and app, why we collect it, who can see it, how long we keep it and the rights you have over it. It applies to patients and to clinicians using Medi-Path.",
      "Medi-Path is currently in a private beta. We've written this policy to describe how the service works during the beta. If anything important changes, we'll update this page and let you know.",
    ],
  },
  {
    heading: "The information we collect",
    body: [
      "We only collect what we need to run the service:",
      [
        "Account details: your name, email address, phone number and the type of account you have (patient or clinician). Your password is never stored as written; it is stored as a one-way scrambled code (a \"hash\") that even we can't read.",
        "Health information: appointments, medications, records, letters and test results that you add, or that clinicians on your care team add, and the messages you exchange with your care team.",
        "Files you upload: for example a photo of medicine packaging or a prescription you share with MedAssist.",
        "Technical information: a sign-in session saved in your browser so you stay logged in, and basic server logs (your IP address, the time and the page requested) that we keep for security and to fix problems.",
      ],
      "We don't collect information from social media, we don't buy data about you from anyone, and we don't use tracking or advertising tools.",
    ],
  },
  {
    heading: "Why we use your information (our lawful basis)",
    body: [
      "UK data protection law says we must have a valid reason, called a \"lawful basis\", for each way we use your information:",
      [
        "To provide the service you signed up for, such as creating your account, booking appointments and showing your records. Lawful basis: contract.",
        "To handle your health information. Health data is \"special category data\" and has extra protection. During the beta we only process it with your explicit consent, which we ask for when you create your account. You can withdraw your consent at any time; we'll then stop processing your health information and close your account.",
        "To keep Medi-Path secure, for example spotting suspicious sign-ins or preventing misuse. Lawful basis: legitimate interests.",
        "To meet legal obligations, for example if we are required by law to keep or share certain information.",
      ],
    ],
  },
  {
    heading: "MedAssist and artificial intelligence",
    body: [
      "During the beta, MedAssist runs entirely on our own servers and uses a built-in reference list of medicines. Nothing you type or upload to MedAssist is sent to any outside company.",
      "We plan to connect MedAssist to external AI services in the future (for example Anthropic's Claude, Perplexity and ElevenLabs) to give better explanations. Before we do, we will update this policy, tell you exactly which provider would receive what information and where they are based, and ask for your consent. If you don't agree, you can keep using the rest of Medi-Path without that feature.",
      "MedAssist gives general information about medicines. It does not make decisions about your care.",
    ],
  },
  {
    heading: "Who can see your information",
    body: [
      [
        "You can always see your own information.",
        "Clinicians on your care team can see your records, appointments and messages. A clinician can only see them after being added to your care team by your doctor or clinic; being a clinician on Medi-Path does not give access on its own.",
        "We (the people running Medi-Path) only look at your information when we need to, for example to fix a problem you've reported. Every time anyone opens your record, it is logged.",
      ],
      "We never sell your information, and we never share it with advertisers. We'll only share it with anyone else if the law requires us to, for example a court order, or if it's needed to protect someone's life in an emergency.",
    ],
  },
  {
    heading: "Where your information is stored",
    body: [
      "Your information is stored on servers we run ourselves in the United Kingdom, including our backups. We do not transfer your information outside the UK.",
    ],
  },
  {
    heading: "How long we keep your information",
    body: [
      "We keep your information for as long as your account is open. If you ask us to delete your account, we'll remove your information from our live systems within 30 days and from our backups within 90 days, unless the law requires us to keep something for longer. If so, we'll tell you what and why.",
      "Server logs are kept for up to 90 days and then deleted.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Under UK GDPR you have the right to:",
      [
        "Access: ask for a copy of the information we hold about you.",
        "Rectification: ask us to correct information that is wrong or incomplete.",
        "Erasure: ask us to delete your information.",
        "Restriction: ask us to limit how we use your information while a concern is looked into.",
        "Portability: receive your information in a common format to take elsewhere.",
        "Objection: object to us using your information on the basis of legitimate interests.",
        "Withdraw consent: at any time, for anything we do based on your consent.",
      ],
      "To use any of these rights, contact us through the Contact page (choose \"Privacy & Your Data\") or by email. It's free, and we'll reply within one month.",
    ],
  },
  {
    heading: "Cookies and browser storage",
    body: [
      "We don't use advertising or tracking cookies. We only use your browser's storage to keep you signed in. If you tick \"Remember me\", you stay signed in after closing the browser; otherwise you are signed out when you close it.",
    ],
  },
  {
    heading: "Age",
    body: [
      "During the beta, Medi-Path is only for people aged 18 and over.",
    ],
  },
  {
    heading: "Complaints",
    body: [
      "If you're unhappy with how we've handled your information, please contact us first so we can put it right.",
      "You also have the right to complain to the Information Commissioner's Office (ICO), the UK's data protection regulator, at ico.org.uk or on 0303 123 1113.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we change this policy, we'll update the date at the top of this page. If the change is significant, for example connecting MedAssist to an outside AI service, we'll tell you before it takes effect and, where needed, ask for your consent again.",
    ],
  },
];

const Privacy = () => (
  <LegalDoc
    title="Privacy Policy"
    intro="How Medi-Path collects, uses and protects your personal and health information, in plain English."
    updated="October 2026"
    sections={sections}
    contactTopic="privacy"
    contactHeading="Questions about your privacy?"
  />
);

export default Privacy;
