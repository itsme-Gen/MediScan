import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "../api/sentMessage";
import Sidebar from "../props/Sidebar";
import Appbar from "../props/Appbar";
import { Bot, CircleUser, Home, Scan, NotepadText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I'm your hospital assistant. How can I help?" },
  ]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const res = await sendMessage({ message: text });
      const botReply = res.data.response;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to AI service." },
      ]);
    } finally {
      setLoading(false);
    }
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-2xl text-sm shadow-sm">
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement;
              handleSendMessage(input.value);
              input.value = "";
            }}
            className="fixed bottom-16 lg:static left-0 right-0 bg-gray-100 px-4 sm:px-6 py-3 flex space-x-2 items-center"
          >
            <input
              type="text"
              name="message"
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Send
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
