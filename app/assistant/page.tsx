import { ChatAssistant } from "@/components/ChatAssistant";

export const metadata = {
  title: "Logic Pro Guru Assistant",
  description: "Get instant help with Logic Pro, mixing, and mastering from your friendly Guru assistant.",
};

export default function AssistantPage() {
  return (
    <main className="sheetPage">
      <article className="sheetContainer">
        <header className="sheetHeader">
          <h1 className="sheetTitle">🤖 Logic Pro Guru Assistant</h1>
          <p className="sheetIntro">
            Chat with Guru about Logic Pro workflows, mixing decisions, plugin choices, or mastering tips. 
            I&apos;m here to help you understand recording, mixing, and making better-sounding music with practical, 
            beginner-friendly guidance.
          </p>
        </header>
        
        <div style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
          <ChatAssistant />
        </div>
      </article>
    </main>
  );
}
