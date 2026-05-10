import { NextResponse } from "next/server";
import {
  LOGIC_PRO_GURU_SYSTEM_PROMPT,
  parseLogicProGuruMessages,
  type LogicProGuruMessage,
} from "@/lib/logic-pro-guru-agent";

const OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";

type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenAIRequestBody = {
  model: string;
  messages: OpenAIMessage[];
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function extractOpenAIMessage(payload: unknown): string | null {
  if (!isPlainObject(payload) || !Array.isArray(payload.choices)) {
    return null;
  }

  const [firstChoice] = payload.choices;

  if (!isPlainObject(firstChoice) || !isPlainObject(firstChoice.message)) {
    return null;
  }

  const { content } = firstChoice.message;

  return typeof content === "string" && content.trim() ? content.trim() : null;
}

function buildOpenAIRequest(model: string, messages: LogicProGuruMessage[]): OpenAIRequestBody {
  return {
    model,
    messages: [
      {
        role: "system",
        content: LOGIC_PRO_GURU_SYSTEM_PROMPT,
      },
      ...messages,
    ],
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  if (!apiKey || !model) {
    return jsonError("The Logic Pro Guru assistant is not configured yet.", 503);
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError("Send a JSON body with a messages array.", 400);
  }

  const messages = parseLogicProGuruMessages(payload);

  if (!messages) {
    return jsonError("Send at least one user message with role and content.", 400);
  }

  const openAIResponse = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildOpenAIRequest(model, messages)),
  });

  let openAIPayload: unknown;

  try {
    openAIPayload = await openAIResponse.json();
  } catch {
    return jsonError("OpenAI returned an unreadable response.", 502);
  }

  if (!openAIResponse.ok) {
    const upstreamError =
      isPlainObject(openAIPayload) && isPlainObject(openAIPayload.error) && typeof openAIPayload.error.message === "string"
        ? openAIPayload.error.message
        : "OpenAI could not answer that request.";

    return jsonError(upstreamError, openAIResponse.status);
  }

  const content = extractOpenAIMessage(openAIPayload);

  if (!content) {
    return jsonError("OpenAI returned an unexpected response format.", 502);
  }

  return NextResponse.json({
    message: {
      role: "assistant",
      content,
    },
  });
}
