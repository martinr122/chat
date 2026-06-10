import { Message } from "@/types/chat";

type ChatWindowProps = {
  messages: Message[];
  loading?: boolean;
};

export default function ChatWindow({ messages, loading }: ChatWindowProps) {
  return (
    <div className="p-5">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 shadow-sm ${
                message.role === "user"
                  ? "bg-[#2b5dab] text-white"
                  : "bg-[#c49a5a] text-white"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-6">
                {message.content}
              </p>

              <p
                className={`mt-2 text-right text-xs ${
                  message.role === "user"
                    ? "text-blue-200"
                    : "text-yellow-100"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-xl bg-[#c49a5a] px-4 py-3 shadow-sm">
              <p className="text-sm text-yellow-100">Asistent píše...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
