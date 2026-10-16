import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  X,
  MessageCircle,
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

const MedAssistWidget = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
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
  }, [messages, isLoading, open]);

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
    <>
      {/* Launcher pinned to the far-right edge */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open MedAssist chat"
          className="fixed right-0 bottom-24 z-50 flex items-center gap-2 rounded-l-full bg-primary text-primary-foreground pl-3 pr-4 py-2 shadow-lg hover:pr-5 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold hidden sm:inline">MedAssist</span>
        </button>
      )}

      {/* Chat panel anchored to the far-right edge */}
      {open && (
        <div className="fixed right-0 bottom-0 sm:bottom-4 z-50 w-full sm:w-[360px] h-[100dvh] sm:h-[520px] sm:max-h-[calc(100vh-2rem)] sm:mr-3 flex flex-col overflow-hidden rounded-none sm:rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-primary text-primary-foreground px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <p className="text-sm font-semibold leading-none">MedAssist</p>
                <p className="text-[11px] opacity-80 mt-0.5">Medication guidance</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="relative flex-1 overflow-y-auto p-3 space-y-4"
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
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
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
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
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
              <div className="flex gap-2">
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
          <div className="border-t p-3 space-y-2">
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
                placeholder="Ask about a medication..."
                className="min-h-[44px] max-h-28 resize-none"
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
            </div>

            <p className="flex items-start gap-1.5 text-[10px] leading-tight text-muted-foreground">
              <ShieldAlert className="w-3 h-3 flex-shrink-0 mt-0.5 text-accent" />
              General, non-diagnostic info only. Always consult a doctor or pharmacist.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MedAssistWidget;