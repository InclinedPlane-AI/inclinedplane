import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, ArrowRight } from "lucide-react";

/* ── Types ── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

/* ── Suggested quick actions ── */
const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about your case studies",
  "Which industries do you serve?",
  "How can I get in touch?",
];

/* ── Persist key ── */
const STORAGE_KEY = "inclinedplane-chat-history";

/* ── Load / save helpers ── */
const loadMessages = (): Message[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Clear conversations older than 24 hours
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    if (parsed.length > 0 && parsed[0].timestamp < cutoff) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

const saveMessages = (msgs: Message[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {
    /* quota exceeded — ignore */
  }
};

/* ── Unique ID ── */
let _id = 0;
const uid = () => `msg-${Date.now()}-${_id++}`;

/* ── Lightweight markdown renderer for chat messages ── */
const renderMarkdown = (text: string) => {
  // Split into lines
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  // Helper: convert inline markdown (bold + links) to JSX
  const renderInline = (str: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    // Match **bold**, [text](url), and plain text
    const regex = /(\*\*(.+?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      // Add plain text before this match
      if (match.index > lastIndex) {
        parts.push(str.slice(lastIndex, match.index));
      }
      if (match[1]) {
        // Bold text — uses foreground color from theme
        parts.push(
          <strong key={`b-${match.index}`} className="chat-bold">
            {match[2]}
          </strong>,
        );
      } else if (match[3]) {
        // Link
        const linkText = match[4];
        const href = match[5];
        parts.push(
          <a
            key={`a-${match.index}`}
            href={href}
            className="chat-link"
            target={href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {linkText}
          </a>,
        );
      }
      lastIndex = match.index + match[0].length;
    }
    // Remaining plain text
    if (lastIndex < str.length) {
      parts.push(str.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [str];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines (add spacing)
    if (trimmed === "") {
      elements.push(<div key={key++} className="chat-spacer" />);
      continue;
    }

    // Horizontal rule (---)
    if (/^-{3,}$/.test(trimmed)) {
      elements.push(<hr key={key++} className="chat-hr" />);
      continue;
    }

    // Numbered list item (1. 2. 3. etc.)
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      elements.push(
        <div key={key++} className="chat-numbered">
          <span className="chat-number">{numberedMatch[1]}.</span>
          <span>{renderInline(numberedMatch[2])}</span>
        </div>,
      );
      continue;
    }

    // Dash bullet sub-point (- item)
    const bulletMatch = trimmed.match(/^-\s+(.*)/);
    if (bulletMatch) {
      elements.push(
        <div key={key++} className="chat-bullet">
          <span className="chat-bullet-dot">•</span>
          <span>{renderInline(bulletMatch[1])}</span>
        </div>,
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="chat-para">
        {renderInline(trimmed)}
      </p>,
    );
  }

  return elements;
};

/* ═══════════════════════════════════════════════════════════════
   ChatWidget
   ═══════════════════════════════════════════════════════════════ */
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  /* Focus input when opened */
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  /* Persist messages */
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  /* ── Send message ── */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        let replyText = "I'm sorry, I couldn't process that. Please try again.";

        // Call Gemini directly (bypasses missing backend on Vercel)
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY");

        const { SYSTEM_PROMPT } = await import("../data/chatbotKnowledge");
        const geminiMessages = newMessages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents: geminiMessages,
              generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
            }),
          },
        );
        if (!res.ok) {
          const errBody = await res.text();
          console.error("Gemini API Error Response:", errBody);
          throw new Error("Gemini API error");
        }
        const data = await res.json();
        replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || replyText;

        const botMsg: Message = {
          id: uid(),
          role: "assistant",
          content: replyText,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        console.error("Chatbot API Connection Error:", error);
        const errMsg: Message = {
          id: uid(),
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment, or reach out to us at support@inclinedplane.com.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading],
  );

  /* ── Key handler ── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /* ── Clear chat ── */
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ── Floating Action Button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] group flex flex-col items-center cursor-pointer"
            aria-label="Open chat"
          >
            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none z-20">
              <div
                className="px-4 py-2 rounded-2xl shadow-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2"
                style={{
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                Hey! 👋
                {/* Pointer triangle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-2.5 h-2.5 rotate-45"
                  style={{
                    background: "hsl(var(--card))",
                    borderRight: "1px solid hsl(var(--border))",
                    borderTop: "1px solid hsl(var(--border))",
                  }}
                />
              </div>
            </div>

            <div className="chatwidget-bot-float relative">
              <img
                src="/chatbot-icon.png"
                alt="Chatbot"
                className="w-[72px] h-[72px] object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
              {/* Notification dot (Smaller) */}
              {!hasMessages && (
                <span className="absolute top-0 right-1 w-3 h-3 rounded-full bg-white border border-[hsl(var(--orange-start))] z-10">
                  <span className="absolute inset-0 rounded-full bg-[hsl(var(--orange-start))] animate-ping opacity-75" />
                </span>
              )}
            </div>
            {/* Oval shadow */}
            <div className="chatwidget-bot-shadow mt-2" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="chatwidget-panel fixed bottom-6 right-6 z-[9999] w-[calc(100vw-48px)] sm:w-[400px] h-[min(600px,calc(100vh-100px))] flex flex-col rounded-2xl overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="chatwidget-header flex items-center justify-between px-5 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="chatwidget-logo-box w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden p-1.5">
                  <img
                    src="/favicon.png"
                    alt="InclinedPlane"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">InclinedPlane AI</h3>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                    Ask anything about our services
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasMessages && (
                  <button
                    onClick={clearChat}
                    className="text-[10px] text-muted-foreground hover:text-foreground font-mono uppercase tracking-wider px-2 py-1 rounded-md hover:bg-accent/50 transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div ref={scrollRef} className="chatwidget-messages flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Welcome message if empty */}
              {!hasMessages && !loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[hsl(var(--orange-start))] to-[hsl(var(--orange-mid))] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="chatwidget-bot-bubble rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%] text-sm leading-relaxed">
                      Hi! I'm the InclinedPlane AI assistant. I can help you learn about our data engineering services,
                      case studies, and how we can help your business. What would you like to know?
                    </div>
                  </div>

                  {/* Suggestion chips */}
                  <div className="pl-10 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="chatwidget-chip text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-[1.02]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i === messages.length - 1 ? 0.05 : 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[hsl(var(--orange-start))] to-[hsl(var(--orange-mid))] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "chatwidget-user-bubble rounded-tr-md"
                        : "chatwidget-bot-bubble rounded-tl-md"
                    }`}
                  >
                    {/* Render formatted markdown */}
                    {msg.role === "user"
                      ? msg.content.split("\n").map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < msg.content.split("\n").length - 1 && <br />}
                          </span>
                        ))
                      : renderMarkdown(msg.content)}
                  </div>
                  {msg.role === "user" && (
                    <div className="chatwidget-user-icon w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[hsl(var(--orange-start))] to-[hsl(var(--orange-mid))] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="chatwidget-bot-bubble rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Input ── */}
            <div className="chatwidget-input-area shrink-0 px-4 py-3">
              <div className="chatwidget-input-box flex items-end gap-2 rounded-xl px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none max-h-24 py-1"
                  style={{ scrollbarWidth: "none" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all disabled:opacity-20"
                  style={{
                    background: input.trim()
                      ? "linear-gradient(135deg, hsl(var(--orange-start)) 0%, hsl(var(--orange-mid)) 100%)"
                      : "transparent",
                  }}
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 size={14} className="text-white animate-spin" />
                  ) : (
                    <Send size={14} className="text-white" />
                  )}
                </button>
              </div>
              <p className="text-center text-[9px] text-muted-foreground/40 mt-2 font-mono">
                Powered by InclinedPlane AI · Responses may not always be accurate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
