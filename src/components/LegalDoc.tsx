import { ReactNode } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteContact } from "@/data/mock";

// A paragraph is a plain string; a bullet list is an array of strings.
export type LegalBlock = string | string[];

export interface LegalSection {
  heading: string;
  body: LegalBlock[];
}

interface LegalDocProps {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  contactTopic: "privacy" | "legal" | "security";
  contactHeading: string;
  children?: ReactNode;
}

// Shared layout for the Privacy, Terms and Security pages: a readable, numbered document.
const LegalDoc = ({ title, intro, updated, sections, contactTopic, contactHeading, children }: LegalDocProps) => (
  <PageShell title={title} intro={intro} centered>
    <article className="max-w-3xl mx-auto space-y-10">
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
        <Badge variant="secondary">Beta</Badge>
        <span>Last updated: {updated}</span>
      </div>

      {/* Contents */}
      <nav aria-label="Contents" className="rounded-xl border border-border bg-muted/40 p-5">
        <p className="font-semibold mb-3">Contents</p>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm list-decimal pl-5">
          {sections.map((s, i) => (
            <li key={s.heading}>
              <a href={`#section-${i + 1}`} className="text-primary hover:underline">{s.heading}</a>
            </li>
          ))}
        </ol>
      </nav>

      {children}

      {sections.map((s, i) => (
        <section key={s.heading} id={`section-${i + 1}`} className="scroll-mt-24 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            {i + 1}. {s.heading}
          </h2>
          {s.body.map((block, j) =>
            Array.isArray(block) ? (
              <ul key={j} className="list-disc pl-6 space-y-1.5 text-muted-foreground leading-relaxed">
                {block.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p key={j} className="text-muted-foreground leading-relaxed">{block}</p>
            )
          )}
        </section>
      ))}

      <Card className="bg-muted/40">
        <CardContent className="p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">{contactHeading}</h2>
          <p className="text-muted-foreground">We read every message and aim to reply within 2 working days.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild><Link to={`/contact?topic=${contactTopic}`}>Contact us</Link></Button>
            <Button asChild variant="outline"><a href={`mailto:${siteContact.email}`}>{siteContact.email}</a></Button>
          </div>
        </CardContent>
      </Card>
    </article>
  </PageShell>
);

export default LegalDoc;
