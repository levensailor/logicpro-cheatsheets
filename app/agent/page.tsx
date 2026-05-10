import type { Metadata } from "next";
import Link from "next/link";
import { LogicProGuruChat } from "@/components/LogicProGuruChat";

export const metadata: Metadata = {
  title: "Logic Pro Guru AI Assistant",
  description: "Ask Logic Pro Guru for beginner-friendly Logic Pro recording, mixing, mastering, and plugin help.",
};

export default function AgentPage() {
  return (
    <main className="agentPageMain">
      <section className="legalHero agentHero">
        <p className="introEyebrow">🤖 Logic Pro Guru AI</p>
        <h1>Get practical help while you work in Logic Pro.</h1>
        <p>
          Ask about tracking, mixing, mastering, buses, stock plugins, settings, and troubleshooting. Your conversation
          history stays on this device so you can pick up the thread later.
        </p>
      </section>

      <LogicProGuruChat variant="full" />

      <section className="agentHelpCard">
        <h2>Good questions to ask</h2>
        <ul>
          <li>What should I check before compressing a vocal?</li>
          <li>How do I route guitar tracks to a bus in Logic Pro?</li>
          <li>What stock plugin chain should I try for a punchy punk bass?</li>
          <li>How do I export a clean mix before mastering?</li>
        </ul>
      </section>

      <div className="legalBackLink">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
