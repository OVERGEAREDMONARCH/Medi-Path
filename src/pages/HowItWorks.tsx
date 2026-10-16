import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import FeatureIcon from "@/components/FeatureIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { howItWorksSteps } from "@/data/mock";

const faqs: { q: string; a: string[] }[] = [
  {
    q: "Is Medi-Path free?",
    a: [
      "Yes. Medi-Path is completely free to use during the beta. You don't need to enter any card details to create an account, book appointments or use MedAssist.",
      "If we ever introduce paid plans in the future, you'll be told well in advance, the features you already rely on won't suddenly disappear, and nothing will ever be charged without you choosing a plan and agreeing to it first.",
    ],
  },
  {
    q: "Can I use Medi-Path in an emergency?",
    a: [
      "No. Medi-Path is not an emergency service and nobody monitors messages in real time for urgent problems.",
      "Call 999 or go to your nearest A&E if someone is seriously ill or injured, or their life is at risk. For example: chest pain, difficulty breathing, severe bleeding, signs of a stroke (face drooping, arm weakness, slurred speech), a seizure, or someone who has collapsed and won't wake up.",
      "If it's urgent but not life-threatening, such as a high temperature that won't come down, a worrying rash, or you're not sure whether you need A&E, call NHS 111 or go to 111.nhs.uk. They're available 24 hours a day and can tell you where to go.",
      "If you're struggling with your mental health, you can call Samaritans free on 116 123 or text SHOUT to 85258 at any time. Our Emergency help page lists all of these in one place.",
    ],
  },
  {
    q: "Is MedAssist medical advice?",
    a: [
      "No. MedAssist is there to help you understand a medicine, not to tell you what to do. It explains things in plain English: what a medicine is usually used for, how it's commonly taken, side effects and warnings to look out for, other medicines or drinks it may interact with, and how to store it.",
      "For example, if you've been prescribed amoxicillin, you can ask \"What is amoxicillin for?\" or upload a photo of the box, and MedAssist will explain that it's an antibiotic for bacterial infections, that you should finish the whole course, and that you should tell your doctor if you have a penicillin allergy.",
      "MedAssist doesn't know your full medical history, so it can't diagnose you or decide whether a medicine is right for you. Always follow the instructions on your prescription and the leaflet in the box, and check with your doctor or pharmacist if anything is unclear or you feel unwell.",
    ],
  },
  {
    q: "Who can see my records?",
    a: [
      "Only you and the clinicians on your care team. Your care team usually starts with your own doctor, the person who knows your history best.",
      "If another clinician needs to help, for example a colleague covering while your doctor is on leave, or a specialist in the same field, they must first be added to your care team by your doctor or your clinic. Being a doctor on Medi-Path does not give anyone access to your records on its own.",
      "Every time a clinician opens your record or a conversation, we log who opened it and when. You'll be able to see who is on your care team, and you can ask us for the access history at any time.",
    ],
  },
  {
    q: "Where is my data stored and how is it protected?",
    a: [
      "Your information is stored on servers in the United Kingdom. Connections to Medi-Path are encrypted, so what you send can't be read by anyone in between, such as on public Wi-Fi.",
      "Health information is treated as special category data under UK GDPR and the Data Protection Act 2018, which means it has extra legal protection. We only use your data to run the service for you. We never sell it, and we never share it for advertising.",
      "You can ask for a copy of everything we hold about you, ask us to correct anything that's wrong, or ask us to delete it. See our Privacy page for the details.",
    ],
  },
  {
    q: "What happens if my doctor isn't available to chat?",
    a: [
      "When you open Live Chat, Medi-Path checks who is working right now. If your own doctor is on duty, your message goes straight to them.",
      "If they're not working today, say they only work Mondays and Wednesdays and it's Friday, your message goes to the next available clinician on your care team. They can see your records, so you won't have to explain everything from the beginning.",
      "If nobody on your care team is available, for example late at night or at the weekend, your message is sent to your clinic's team inbox and you'll be told when to expect a reply, usually on the next working day. If you need help sooner, use NHS 111.",
    ],
  },
  {
    q: "How will checking in at my appointment work?",
    a: [
      "When you book an appointment, you'll get a booking reference and a QR code. You'll find them in your dashboard and in your confirmation email.",
      "At the clinic, show the QR code on your phone (or read out the reference) at reception and you're checked in. Your details are already on the system, so there's no need to fill in forms or repeat your address and date of birth at the desk.",
      "This feature is coming soon. During the beta, you can already book, reschedule and see your appointments online.",
    ],
  },
  {
    q: "Can I change or cancel an appointment?",
    a: [
      "Yes. Open the appointment in your dashboard and choose Reschedule to pick a new date and time. You'll see which slots are free, so you don't have to call anyone.",
      "If you can't make it at all, please cancel as early as you can. It frees the slot for someone else who needs to be seen.",
    ],
  },
  {
    q: "Can I delete my account?",
    a: [
      "Yes. Contact us from the Contact page (choose \"Privacy & Your Data\") and we'll delete your account and the information linked to it.",
      "Before deleting, you can ask for a copy of your data to keep for your own records. In rare cases we may need to keep a small amount of information for a limited time if the law requires it, and if so we'll tell you exactly what and why.",
    ],
  },
];

const HowItWorks = () => (
  <PageShell title="How it works" intro="Four simple steps to get started with Medi-Path.">
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {howItWorksSteps.map((s, i) => (
        <li key={s.title}>
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col h-full gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <FeatureIcon name={s.icon} className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-muted-foreground flex-1">{s.description}</p>
              <Button asChild variant="outline" size="sm"><Link to={s.linkTo}>{s.linkLabel}</Link></Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>

    <section className="mt-16 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Frequently asked questions</h2>
        <p className="text-muted-foreground">
          Can't find your answer? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="space-y-3 text-muted-foreground leading-relaxed">
              {f.a.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  </PageShell>
);

export default HowItWorks;