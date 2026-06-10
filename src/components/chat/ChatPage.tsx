"use client";

import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";
import { Message } from "@/types/chat";
import { getOrCreateClientId } from "@/lib/client";
import { sendMessage } from "@/lib/api";
import { createSessionId } from "@/lib/session";

function getTimeString() {
  return new Date().toLocaleTimeString("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const sessionId = createSessionId();

function createMessage(role: "user" | "assistant", content: string): Message {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: getTimeString(),
  };
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    createMessage("assistant", "Vitajte vo Virtuálnom asistentovi UPJŠ."),
  ]);

  useEffect(() => {
    getOrCreateClientId();
  }, []);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const prompt = input.trim();
    const clientId = getOrCreateClientId();

    setMessages((prev) => [...prev, createMessage("user", prompt)]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(clientId, sessionId, prompt);

      setMessages((prev) => [
        ...prev,
        createMessage("assistant", data.output || "Bez odpovede"),
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        createMessage("assistant", "Služba momentálne nie je dostupná."),
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-80px)] max-w-7xl flex-col p-4">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex-1 overflow-y-auto">
          <ChatWindow messages={messages} loading={loading} />
        </div>

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={loading}
        />
      </div>
    </div>
  );
}
