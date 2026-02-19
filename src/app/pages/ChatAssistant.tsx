import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "../api/SentMessage";
import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";
import { Bot, CircleUser, Home, Scan, NotepadText, AlertCircle, Sparkles, Send, Loader2, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface Message {
  sender: "user" | "bot";
  text: string;
  mongoContext?: string;
  patientCount?: number;
  timestamp?: string;
  isError?: boolean;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm your hospital assistant. I can help you find patient information, search by medical conditions, allergies, and more. How can I help?"
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await sendMessage({ message: text });
      const botReply = res.data.response;
      const mongoContext = res.data.mongo_context;
      const patientCount = res.data.patient_count;
      const timestamp = res.data.timestamp;

      const botMessage: Message = {
        sender: "bot",
        text: botReply,
        mongoContext: mongoContext,
        patientCount: patientCount,
        timestamp: timestamp,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);

      const errorMessage = err.response?.data?.error
        ? `Error: ${err.response.data.error}`
        : "Error connecting to AI service. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorMessage,
          isError: true
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const quickActions = [
    "How many patients do we have?",
    "Show patients with diabetes",
    "Find patients with penicillin allergy",
    "Database statistics"
  ];

  const helperTips = [
    "Ask \"Show patients with diabetes and asthma\" to combine filters.",
    "Say \"List recent admissions\" to see latest records.",
    "Try \"Search allergic to penicillin\" to avoid conflicts.",
    "Ask \"Patients over 65\" for quick age filtering."
  ];

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="chatassistant relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(14,165,233,0.12), transparent 28%), radial-gradient(circle at 85% 10%, rgba(99,102,241,0.10), transparent 25%)",
        }}
      />

      <div className="flex flex-col lg:flex-row h-full relative">
        <div className="sidebar hidden lg:block">
          <Sidebar />
        </div>

        <div className="main-content flex-1 flex flex-col lg:ml-70 overflow-hidden">
          <Appbar iconTitle={Bot} title="AI Assistant" icon={CircleUser} />

          <div className="flex-1 px-4 sm:px-6 lg:px-10 pb-28 lg:pb-10 overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-3 h-full">
              <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                <div className="rounded-3xl bg-white/80 border border-slate-200 shadow-sm px-5 sm:px-6 py-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Faster chart queries</p>
                      <p className="text-xs text-slate-500">Ask about patients, conditions, or allergies and I will surface counts and details.</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Live session
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action)}
                      className="group flex items-center gap-2 text-xs font-medium bg-white/80 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-full shadow-sm hover:-translate-y-0.5 transition duration-150 hover:border-sky-200 hover:text-sky-700"
                    >
                      <Sparkles className="w-4 h-4 text-sky-500 group-hover:rotate-6 transition" />
                      {action}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto rounded-3xl bg-white/90 border border-slate-200 shadow-md px-4 sm:px-6 py-5 space-y-4">
                    {messages.map((msg, index) => {
                      const isUser = msg.sender === "user";
                      const bubbleBase = isUser
                        ? "bg-sky-600 text-white border border-sky-600"
                        : msg.isError
                        ? "bg-rose-50 text-rose-800 border border-rose-200"
                        : "bg-slate-100 text-slate-800 border border-slate-200";

                      return (
                        <div
                          key={index}
                          className={`flex gap-3 ${isUser ? "flex-row-reverse text-right" : "flex-row"}`}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${
                              isUser ? "bg-sky-600 text-white" : "bg-white text-slate-600 border border-slate-200"
                            }`}
                          >
                            {isUser ? <CircleUser className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                          </div>

                          <div className="space-y-1 max-w-[min(760px,100%)]">
                            <div
                              className={`flex items-center gap-2 text-[11px] font-medium ${
                                isUser ? "justify-end text-slate-500" : "text-slate-500"
                              }`}
                            >
                              <span className="uppercase tracking-wide text-[10px] text-slate-600">
                                {isUser ? "You" : "Assistant"}
                              </span>
                              {msg.timestamp && <span className="text-slate-400">| {formatTime(msg.timestamp)}</span>}
                              {msg.patientCount !== undefined && msg.patientCount > 0 && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100">
                                  Patients: {msg.patientCount}
                                </span>
                              )}
                              {msg.isError && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 text-rose-700 px-2 py-0.5 border border-rose-200">
                                  Issue
                                </span>
                              )}
                            </div>

                            <div
                              className={`relative rounded-2xl px-4 py-3 text-sm shadow-sm ${bubbleBase} ${
                                isUser ? "rounded-tr-sm" : "rounded-tl-sm"
                              }`}
                            >
                              {msg.isError && (
                                <div className="flex items-center gap-1 text-xs font-semibold mb-1">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>Issue detected</span>
                                </div>
                              )}
                              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                            </div>

                            {msg.mongoContext && msg.mongoContext !== msg.text && (
                              <details className="ml-1 text-left">
                                <summary className="text-xs text-sky-700 cursor-pointer hover:underline flex items-center gap-1">
                                  <Info className="w-3.5 h-3.5" />
                                  View database details
                                </summary>
                                <div className="mt-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
                                  {msg.mongoContext}
                                </div>
                              </details>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {loading && (
                      <div className="flex gap-3 items-center text-slate-500">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </div>
                        <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-2xl text-sm border border-slate-200 shadow-sm">
                          Searching hospital records...
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="fixed bottom-16 left-0 right-0 lg:static bg-transparent px-4 sm:px-0 mt-2 z-30"
                >
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-2 shadow-lg lg:shadow-sm focus-within:ring-2 focus-within:ring-sky-300 transition">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about patients, conditions, allergies..."
                      disabled={loading}
                      className="flex-1 px-1 py-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none disabled:text-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={loading || !inputValue.trim()}
                      className="inline-flex items-center gap-1 bg-sky-600 text-white text-sm font-semibold px-3 py-2 rounded-full hover:bg-sky-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-4 hidden lg:block">
                <div className="rounded-3xl bg-white/80 border border-slate-200 shadow-sm p-5 space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                    <Info className="w-4 h-4 text-sky-600" />
                    Helpful prompts
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {helperTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-sky-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white p-5 shadow-md space-y-2">
                  <p className="text-sm font-semibold">Session notes</p>
                  <p className="text-xs opacity-90">
                    I will attach database context when relevant. Expand "View database details" inside responses to see what was used.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-3 z-50 lg:hidden">
        <button
          onClick={() => clearStorageAndNavigate("/dashboard")}
          className={`flex flex-col items-center transition ${
            isActive("/dashboard") ? "text-primary" : "text-secondary hover:text-primary"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/scanid")}
          className={`flex flex-col items-center transition ${
            isActive("/scanid") ? "text-primary" : "text-secondary hover:text-primary"
          }`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs font-medium">Scan ID</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/dashboard")}
          className={`flex flex-col items-center transition ${
            isActive("/records") ? "text-primary" : "text-secondary hover:text-primary"
          }`}
        >
          <NotepadText className="w-6 h-6" />
          <span className="text-xs font-medium">Records</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/chatassistant")}
          className={`flex flex-col items-center transition ${
            isActive("/chatassistant") ? "text-primary" : "text-secondary hover:text-primary"
          }`}
        >
          <Bot className="w-6 h-6" />
          <span className="text-xs font-medium">Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
