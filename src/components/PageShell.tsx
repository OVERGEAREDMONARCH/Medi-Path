import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface PageShellProps {
  title: string;
  intro?: string;
  centered?: boolean;
  children: ReactNode;
}

const PageShell = ({ title, intro, centered = false, children }: PageShellProps) => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Navigation />
    <main className="flex-1 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <header className={cn("max-w-3xl mb-10", centered && "mx-auto text-center")}>
          <h1 className="text-3xl sm:text-4xl font-bold leading-relaxed">{title}</h1>
          {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
        </header>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default PageShell;