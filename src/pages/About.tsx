import { Link } from "react-router-dom";
import { BellRing, Bot, CalendarCheck, HeartHandshake, Lock, MessageSquare, Pill, QrCode, ShieldCheck, Users } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const whatYouCanDo = [
  { icon: CalendarCheck, title: "Book online", text: "Choose a clinician, date and time without waiting on the phone." },
  { icon: QrCode, title: "Arrive ready", text: "Get a booking reference and QR code to show at reception, so check-in takes seconds." },
  { icon: MessageSquare, title: "Talk to your care team", text: "Message your own doctor, or the next available member of your care team." },
  { icon: Pill, title: "Keep track of medicines", text: "See your current medications and how to take them in one place." },
  { icon: Bot, title: "Understand your medication", text: "MedAssist explains what your doctor prescribed in plain English." },
  { icon: BellRing, title: "No more 8am phone rush", text: "Get reminders before appointments and medicine doses, and reschedule or cancel in a couple of taps, freeing your slot for someone else." },
];

const principles = [
  { icon: Lock, title: "Your data, your control", text: "Health data is special category data under UK GDPR. Only clinicians on your care team can see your records, every access is logged, and you can ask for a copy or deletion at any time." },
  { icon: ShieldCheck, title: "Safety first", text: "Medi-Path is not an emergency service. In an emergency call 999; for urgent advice call NHS 111. MedAssist gives general information, never a diagnosis." },
  { icon: HeartHandshake, title: "People, not bots, for care", text: "Conversations about your care are always with real clinicians. AI is only used to explain medication more clearly." },
  { icon: Users, title: "Honest by default", text: "We only describe features that exist. Anything still being built is clearly marked \"Coming soon\"." },
];

const About = () => (
  <PageShell
    title="About Medi-Path"
    intro="Medi-Path helps patients handle the admin side of healthcare online, so time at the clinic is spent on care, not paperwork."
  >
    <div className="space-y-14">
      {/* Why */}
      <section className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Why Medi-Path exists</h2>
          <p className="text-muted-foreground leading-relaxed">
            Booking an appointment often means waiting on hold. Arriving at a clinic often means repeating the same
            details at the desk. And after an appointment, it's easy to forget exactly what the doctor said about a
            new medicine.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Medi-Path brings these steps online: book in advance, arrive with a booking code, keep in touch with the
            clinicians who know you, and look up a clear explanation of your medication whenever you need it.
          </p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-3">
            <Badge variant="secondary">Our mission</Badge>
            <p className="text-lg font-medium leading-relaxed">
              To make everyday healthcare simpler and clearer for patients, while keeping their information private
              and in their control.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* What you can do */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">What you can do with Medi-Path</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatYouCanDo.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <CardContent className="p-5 space-y-2">
                <Icon className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Some of these features are still being built. See the <Link to="/features" className="text-primary hover:underline">Features page</Link> for what's available today.
        </p>
      </section>

      {/* Who it's for */}
      <section className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">For patients</h3>
            <p className="text-sm text-muted-foreground">
              Anyone who wants to book, prepare for and follow up on appointments without the phone queues, and
              understand their medication better.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">For clinicians and clinics</h3>
            <p className="text-sm text-muted-foreground">
              A clear view of each patient's appointments, records and messages, shared only with the care team
              responsible for them. Clinician accounts are approved individually.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Principles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Our principles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {principles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Where we are now */}
      <section className="rounded-2xl border border-border bg-muted/40 p-6 space-y-3">
        <Badge>Beta</Badge>
        <h2 className="text-2xl font-bold">Where we are now</h2>
        <p className="text-muted-foreground leading-relaxed">
          Medi-Path is in a private beta, built and hosted in the United Kingdom by an independent developer. A small
          group of testers is trying it and helping shape what comes next: real-time chat with care teams, booking
          codes for check-in, and video consultations.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Have feedback or an idea? We'd genuinely like to hear it.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild><Link to="/contact">Get in touch</Link></Button>
        <Button asChild variant="outline"><Link to="/how-it-works">How it works</Link></Button>
      </div>
    </div>
  </PageShell>
);

export default About;