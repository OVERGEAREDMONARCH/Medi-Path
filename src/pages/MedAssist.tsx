import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  User,
  Send,
  ImagePlus,
  FileText,
  Paperclip,
  Pill,
  AlertTriangle,
  Info,
  Clock,
  Activity,
  ShieldAlert,
  Loader2,
  Upload,
} from "lucide-react";
import {
  mockOCR,
  mockChatResponse,
  lookupMedication,
  type MedicationInfo,
} from "@/lib/medassist";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachment?: { name: string; type: string };
}

const MedAssist = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm MedAssist. Ask me about a medication, or upload a photo of packaging, a pill, or a prescription (image/PDF). I provide general, non-diagnostic information to help you understand your medicine safely.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [insights, setInsights] = useState<MedicationInfo | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const addMessage = (msg: Omit<ChatMessage, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: crypto.randomUUID() }]);
  };

  const handleSendText = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    addMessage({ role: "user", content: question });
    setInput("");
    setIsLoading(true);

    const { reply, medication } = await mockChatResponse(question);
    addMessage({ role: "assistant", content: reply });
    if (medication) setInsights(medication);
    setIsLoading(false);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || isLoading) return;
    const file = files[0];

    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";
    if (!isImage && !isPdf) {
      toast({
        title: "Unsupported file",
        description: "Please upload an image or a PDF prescription.",
        variant: "destructive",
      });
      return;
    }

    addMessage({
      role: "user",
      content: isImage ? "Uploaded an image for review." : "Uploaded a prescription file.",
      attachment: { name: file.name, type: file.type },
    });
    setIsLoading(true);

    // Mock OCR extraction
    const extracted = await mockOCR(file);
    const medication = lookupMedication(extracted);

    if (medication) {
      setInsights(medication);
      addMessage({
        role: "assistant",
        content: `I extracted "${extracted}" from your upload.\n\n${medication.ai}\n\nStructured details are shown in the Medication Insights panel. This is general information, not a diagnosis.`,
      });
    } else {
      addMessage({
        role: "assistant",
        content: `I extracted "${extracted}" but couldn't match it to my reference list. Please double-check the packaging or consult a pharmacist.`,
      });
    }
    setIsLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-10">
        {/* Header */}
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">MedAssist Chatbot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Understand your medication safely
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-2">
            Ask questions, or upload packaging, pills, or prescriptions for general guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Chat Column */}
          <Card className="lg:col-span-2 flex flex-col h-[70vh] overflow-hidden">
            <CardHeader className="border-b py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Chat with MedAssist
              </CardTitle>
            </CardHeader>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 sm:gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.attachment && (
                      <div
                        className={`flex items-center gap-2 mb-2 pb-2 border-b ${
                          msg.role === "user" ? "border-primary-foreground/20" : "border-border"
                        }`}
                      >
                        {msg.attachment.type.startsWith("image/") ? (
                          <ImagePlus className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                        <span className="text-xs truncate">{msg.attachment.name}</span>
                      </div>
                    )}
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </div>
                </div>
              )}

              {isDragging && (
                <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center pointer-events-none">
                  <div className="text-center text-primary">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">Drop your file here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-3 sm:p-4 space-y-3">
              <div className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendText();
                    }
                  }}
                  placeholder="Ask about a medication, e.g. What is amoxicillin used for?"
                  className="min-h-[44px] max-h-32 resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSendText}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="flex-shrink-0 h-11 w-11"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isLoading}
                  className="text-xs"
                >
                  <ImagePlus className="w-4 h-4 mr-1.5" />
                  Image
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="text-xs"
                >
                  <Paperclip className="w-4 h-4 mr-1.5" />
                  Prescription
                </Button>
                <span className="text-xs text-muted-foreground ml-auto hidden sm:inline">
                  or drag & drop a file
                </span>
              </div>
            </div>
          </Card>

          {/* Insights Panel */}
          <Card className="h-[70vh] overflow-hidden flex flex-col">
            <CardHeader className="border-b py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Pill className="w-5 h-5 text-secondary" />
                Medication Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              {!insights ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                  <Pill className="w-10 h-10 mb-3 opacity-40" />
                  <p className="text-sm">
                    Medication details will appear here after you ask a question or upload a file.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{insights.medication}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      {insights.info.what}
                    </p>
                  </div>

                  <InsightBlock icon={<Activity className="w-4 h-4 text-secondary" />} title="Common Uses">
                    <div className="flex flex-wrap gap-1.5">
                      {insights.info.uses.map((u) => (
                        <Badge key={u} variant="secondary" className="font-normal">
                          {u}
                        </Badge>
                      ))}
                    </div>
                  </InsightBlock>

                  <InsightBlock icon={<Pill className="w-4 h-4 text-primary" />} title="General Dosage">
                    <ul className="space-y-1">
                      {insights.info.dosage.map((d) => (
                        <li key={d} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </InsightBlock>

                  <InsightBlock
                    icon={<AlertTriangle className="w-4 h-4 text-accent" />}
                    title="Warnings"
                  >
                    <ul className="space-y-1">
                      {insights.info.warnings.map((w) => (
                        <li key={w} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-accent">•</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </InsightBlock>

                  <InsightBlock
                    icon={<ShieldAlert className="w-4 h-4 text-destructive" />}
                    title="Interactions"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {insights.info.interactions.map((i) => (
                        <Badge key={i} variant="outline" className="font-normal">
                          {i}
                        </Badge>
                      ))}
                    </div>
                  </InsightBlock>

                  <InsightBlock icon={<Clock className="w-4 h-4 text-primary" />} title="Storage">
                    <p className="text-sm text-muted-foreground">{insights.info.storage}</p>
                  </InsightBlock>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground max-w-3xl mx-auto p-3 rounded-lg bg-muted/50 border border-border">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
          <p>
            MedAssist provides general, non-diagnostic information only and does not replace advice
            from a qualified doctor or pharmacist. Always follow your prescription and consult a
            professional for medical decisions.
          </p>
        </div>
      </main>
    </div>
  );
};

const InsightBlock = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h4 className="font-semibold text-sm text-foreground">{title}</h4>
    </div>
    {children}
  </div>
);

export default MedAssist;
