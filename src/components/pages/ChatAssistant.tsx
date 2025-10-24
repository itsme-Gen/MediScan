import React, { useState } from "react";
import Sidebar from "../props/Sidebar";
import Appbar from "../props/Appbar";
import { Bot, CircleUser} from "lucide-react";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I'm your hospital assistant. How can I help?" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5050/chat", { message: text });
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
    <div className="ChatAssistant flex h-screen bg-gray-100">
      <Sidebar />

      <div className="main-content flex-1 flex flex-col ml-70">
        <Appbar
          iconTitle={Bot}
          title="AI Assistant"
          icon={CircleUser}
        />

        <div className="flex flex-col flex-1 p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-md p-4 space-y-3">
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
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("message") as HTMLInputElement);
              handleSendMessage(input.value);
              input.value = "";
            }}
            className="flex space-x-2 mt-4"
          >
            <input
              type="text"
              name="message"
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
    </div>
  );
};

export default ChatAssistant;
