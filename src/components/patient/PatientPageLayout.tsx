import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PatientHeader } from "./PatientHeader";

export const PatientPageLayout = ({ title, description, children }: { title: string; description?: string; children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <PatientHeader />
    <main className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <Link to="/patient-dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{title}</h2>
      {description && <p className="text-muted-foreground mb-6">{description}</p>}
      {children}
    </main>
  </div>
);
