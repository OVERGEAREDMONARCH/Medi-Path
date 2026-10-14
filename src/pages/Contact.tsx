import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { contactTopics } from "@/data/mock";

const Contact = () => {
  const [params] = useSearchParams();
  const topic = contactTopics[params.get("topic") ?? ""] ?? contactTopics.default;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold leading-relaxed">{topic.heading}</h1>
          <p className="mt-2 text-muted-foreground">{topic.description}</p>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
