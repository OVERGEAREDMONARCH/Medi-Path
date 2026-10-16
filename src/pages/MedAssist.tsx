import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  User,
  Send,
  ImagePlus,
  FileText,
  Paperclip,
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
import MedicationCard from "@/components/medassist/MedicationCard";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachment?: { name: string; type: string };
  medication?: MedicationInfo;
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
    addMessage({ role: "assistant", content: reply, medication: medication ?? undefined });
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
    if (!extracted) {
      addMessage({
        role: "assistant",
        content:
          "I couldn't recognise a medication in this file. Please type the medication name exactly as it appears on the packaging, or check with a pharmacist.",
      });
      setIsLoading(false);
      return;
    }
    const medication = lookupMedication(extracted);

    if (medication) {
      addMessage({
        role: "assistant",
        content: `I found "${extracted}" in your upload.\n\n${medication.ai}\n\nThis is general information, not a diagnosis.`,
        medication,
      });
    } else {
      addMessage({
        role: "assistant",
        content: `I found "${extracted}" but couldn't match it to my reference list. Please double-check the packaging or consult a pharmacist.`,
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
            <span className="text-sm font-medium text-primary">MedAssist</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Understand your medication safely
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-2">
            Ask questions, or upload packaging, pills, or prescriptions for general guidance.
          </p>
        </div>

        {/* Chat */}
        <Card className="max-w-3xl mx-auto flex flex-col h-[70vh] overflow-hidden">
          <CardHeader className="border-b py-3 sm:py-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Chat with MedAssist
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="relative flex-1 overflow-y-auto p-3 sm:p-4 space-y-4"
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
                className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
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
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm ${
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
                  <p className="whitespace-pre-line">{msg.content}</p>
                  {msg.medication && <MedicationCard info={msg.medication} />}
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
                  Analysing...
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
                aria-label="Send message"
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
                onChange={(e) => {
                  handleFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                onChange={(e) => {
                  handleFiles(e.target.files);
                  e.target.value = "";
                }}
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
                or drag &amp; drop a file
              </span>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground max-w-3xl mx-auto p-3 rounded-lg bg-muted/50 border border-border">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
          <p>
            MedAssist provides general, non-diagnostic information only and does not replace advice
            from a qualified doctor or pharmacist. Always follow your prescription and consult a
            professional for medical decisions. In an emergency, call 999.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MedAssist;