
import { Header } from "@/components/layout/header";
import { Chatbot } from "@/components/chatbot/chatbot";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Chatbot />
      </main>
    </div>
  );
}
