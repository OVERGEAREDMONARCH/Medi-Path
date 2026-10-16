import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { contactTopics } from "@/data/mock";

const Contact = () => {
  const [params] = useSearchParams();
  const topicKey = params.get("topic");
  const topic = topicKey ? contactTopics[topicKey] : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 pt-16">
        <ContactSection description={topic?.description} />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;