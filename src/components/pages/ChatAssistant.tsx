import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "../api/sentMessage";
import Sidebar from "../props/Sidebar";
import Appbar from "../props/Appbar";
import { Bot, CircleUser, Home, Scan, NotepadText, AlertCircle } from "lucide-react";
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

  // Auto-scroll to bottom when new messages arrive
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

      // Create bot message with additional context
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
      
      // More detailed error message
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Format timestamp for display
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return "";
    }
  };

  // Quick action buttons for common queries
  const quickActions = [
    "How many patients do we have?",
    "Show patients with diabetes",
    "Find patients with penicillin allergy",
    "Database statistics"
  ];

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="chatassistant flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="sidebar hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col lg:ml-70 overflow-hidden">
        <Appbar iconTitle={Bot} title="AI Assistant" icon={CircleUser} />

        {/* Chat Section */}
        <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8 overflow-hidden">
          {/* Chat Container */}
          <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-3">
            {/* Quick Actions (show only when no messages beyond greeting) */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2 font-medium">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition border border-blue-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-xs md:max-w-md lg:max-w-lg">
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : msg.isError
                        ? "bg-red-50 text-red-700 rounded-bl-none border border-red-200"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.isError && (
                      <div className="flex items-center gap-1 mb-1">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Error</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>

                  {/* Show additional context for bot messages */}
                  {msg.sender === "bot" && !msg.isError && msg.patientCount !== undefined && msg.patientCount > 0 && (
                    <div className="mt-1 text-xs text-gray-500 ml-2">
                      📊 {msg.patientCount} patient{msg.patientCount !== 1 ? 's' : ''} found
                    </div>
                  )}

                  {/* Show timestamp */}
                  {msg.timestamp && (
                    <div className="mt-1 text-xs text-gray-400 ml-2">
                      {formatTime(msg.timestamp)}
                    </div>
                  )}

                  {/* Expandable context (optional) */}
                  {msg.mongoContext && msg.mongoContext !== msg.text && (
                    <details className="mt-2 ml-2">
                      <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-700">
                        View database details
                      </summary>
                      <div className="mt-1 text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 whitespace-pre-wrap">
                        {msg.mongoContext}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-2xl text-sm shadow-sm flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span>Searching...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="fixed bottom-16 lg:static left-0 right-0 bg-gray-100 px-4 sm:px-6 py-3 flex space-x-2 items-center"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about patients, conditions, allergies..."
              disabled={loading}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-3 z-50 lg:hidden">
        <button
          onClick={() => clearStorageAndNavigate('/dashboard')}
          className={`flex flex-col items-center transition ${
            isActive('/dashboard') ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/scanid')}
          className={`flex flex-col items-center transition ${
            isActive('/scanid') ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs font-medium">Scan ID</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/dashboard')}
          className={`flex flex-col items-center transition ${
            isActive('/records') ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <NotepadText className="w-6 h-6" />
          <span className="text-xs font-medium">Records</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/chatassistant')}
          className={`flex flex-col items-center transition ${
            isActive('/chatassistant') ? 'text-primary' : 'text-secondary hover:text-primary'
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