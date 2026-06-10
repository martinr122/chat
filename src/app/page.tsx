import Header from "@/components/layout/Header";
import ChatPage from "@/components/chat/ChatPage";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ChatPage />
    </main>
  );
}