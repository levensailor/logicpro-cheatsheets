"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { LogicProGuruMessage, LogicProGuruRole } from "@/lib/logic-pro-guru-agent";

type StoredChatMessage = LogicProGuruMessage & {
  id: string;
  createdAt: string;
};

type LogicProGuruChatProps = {
  variant?: "compact" | "full";
  showPageLink?: boolean;
};

const STORAGE_KEY = "logic-pro-guru-chat-history";
const MAX_STORED_MESSAGES = 30;
const INITIAL_MESSAGE: StoredChatMessage = {
  id: "logic-pro-guru-welcome",
  role: "assistant",
  content:
    "Hi, I am Logic Pro Guru. Ask me about recording, mixing, mastering, plugins, routing, or troubleshooting in Logic Pro.",
  createdAt: "system",
};

const EXAMPLE_PROMPTS = [
  "How should I set up gain staging before mixing a rock song?",
  "Give me a beginner vocal chain using stock Logic Pro plugins.",
  "Why does my mix sound muddy, and what should I check first?",
];

function createChatMessage(role: LogicProGuruRole, content: string): StoredChatMessage {
  const createdAt = new Date().toISOString();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${createdAt}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    role,
    content,
    createdAt,
  };
}
function isStoredChatMessage(value: unknown): value is StoredChatMessage {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    typeof message.id === "string" &&
    typeof message.createdAt === "string" &&
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
}
function loadStoredMessages(): StoredChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isStoredChatMessage).slice(-MAX_STORED_MESSAGES);
  } catch {
    return [];
  }
}

function isAgentResponse(value: unknown): value is { message: LogicProGuruMessage } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const response = value as Record<string, unknown>;

  if (typeof response.message !== "object" || response.message === null || Array.isArray(response.message)) {
    return false;
  }

  const message = response.message as Record<string, unknown>;

  return message.role === "assistant" && typeof message.content === "string" && message.content.trim().length > 0;
}

function isAgentError(value: unknown): value is { error: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as Record<string, unknown>).error === "string"
  );
}

export function LogicProGuruChat({ variant = "full", showPageLink = false }: LogicProGuruChatProps) {
  const [messages, setMessages] = useState<StoredChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const persistedMessages = useMemo(
    () => messages.filter((message) => message.id !== INITIAL_MESSAGE.id),
    [messages],
  );

  useEffect(() => {
    const storedMessages = loadStoredMessages();
    setMessages(storedMessages.length > 0 ? [INITIAL_MESSAGE, ...storedMessages] : [INITIAL_MESSAGE]);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedMessages.slice(-MAX_STORED_MESSAGES)));
  }, [isLoaded, persistedMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  async function sendMessage(messageText: string) {
    const trimmedInput = messageText.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    const userMessage = createChatMessage("user", trimmedInput);
    const nextMessages = [...persistedMessages, userMessage].slice(-MAX_STORED_MESSAGES);

    setMessages([INITIAL_MESSAGE, ...nextMessages]);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/logic-pro-guru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const payload: unknown = await response.json();

      if (!response.ok) {
        throw new Error(isAgentError(payload) ? payload.error : "Logic Pro Guru could not answer right now.");
      }

      if (!isAgentResponse(payload)) {
        throw new Error("Logic Pro Guru returned an unexpected response.");
      }

      const assistantMessage = createChatMessage("assistant", payload.message.content);
      setMessages([INITIAL_MESSAGE, ...[...nextMessages, assistantMessage].slice(-MAX_STORED_MESSAGES)]);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Logic Pro Guru could not answer right now.");
      setMessages([INITIAL_MESSAGE, ...persistedMessages]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function clearHistory() {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className={`agentChat agentChat-${variant}`} aria-label="Logic Pro Guru AI assistant">
      <div className="agentChatHeader">
        <div>
          <p className="agentKicker">AI assistant</p>
          <h2>Ask Logic Pro Guru</h2>
          <p>
            Get step-by-step help for tracking, mixing, mastering, routing, and stock Logic Pro plugin choices.
          </p>
        </div>
        {showPageLink ? (
          <Link className="agentOpenLink" href="/agent">
            Open full chat
          </Link>
        ) : null}
      </div>

      <div className="agentPromptChips" aria-label="Example questions">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button key={prompt} type="button" onClick={() => setInput(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="agentMessages" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`agentMessage agentMessage-${message.role}`}>
            <span>{message.role === "assistant" ? "Logic Pro Guru" : "You"}</span>
            <p>{message.content}</p>
          </article>
        ))}
        {isSending ? (
          <article className="agentMessage agentMessage-assistant agentMessage-loading">
            <span>Logic Pro Guru</span>
            <p>Thinking through a practical Logic Pro answer...</p>
          </article>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      {error ? (
        <p className="agentError" role="alert">
          {error}
        </p>
      ) : null}

      <form className="agentComposer" onSubmit={handleSubmit}>
        <label htmlFor={`logic-pro-guru-input-${variant}`}>Ask a Logic Pro question</label>
        <textarea
          id={`logic-pro-guru-input-${variant}`}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Example: What stock plugins should I try on a muddy bass guitar?"
          rows={variant === "compact" ? 3 : 4}
        />
        <div className="agentComposerActions">
          <button type="button" className="agentSecondaryButton" onClick={clearHistory} disabled={isSending}>
            Clear history
          </button>
          <button type="submit" className="agentPrimaryButton" disabled={isSending || !input.trim()}>
            {isSending ? "Asking..." : "Ask Guru"}
          </button>
        </div>
      </form>
    </section>
  );
}
