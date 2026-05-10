import { NextResponse } from "next/server";
import {
  LOGIC_PRO_GURU_SYSTEM_PROMPT,
  parseLogicProGuruMessages,
  type LogicProGuruMessage,
} from "@/lib/logic-pro-guru-agent";

const OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

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

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "unknown-client";
}

function isRateLimited(clientIdentifier: string): boolean {
  const now = Date.now();
  const existingBucket = rateLimitBuckets.get(clientIdentifier);

  if (!existingBucket || existingBucket.resetAt <= now) {
    rateLimitBuckets.set(clientIdentifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existingBucket.count += 1;
  return existingBucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function getOpenAIErrorMessage(status: number): string {
  if (status === 401 || status === 403) {
    return "The Logic Pro Guru assistant is not configured correctly.";
  }

  if (status === 429) {
    return "Logic Pro Guru is temporarily busy. Please try again shortly.";
  }

  return "OpenAI could not answer that request.";
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

  if (!isSameOriginRequest(request)) {
    return jsonError("Use the Logic Pro Guru assistant from the app.", 403);
  }

  if (isRateLimited(getClientIdentifier(request))) {
    return jsonError("Too many assistant requests. Please wait a minute and try again.", 429);
  }

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

  let openAIResponse: Response;

  try {
    openAIResponse = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildOpenAIRequest(model, messages)),
    });
  } catch {
    return jsonError("Logic Pro Guru could not reach OpenAI. Please try again shortly.", 502);
  }

  let openAIPayload: unknown;

  try {
    openAIPayload = await openAIResponse.json();
  } catch {
    return jsonError("OpenAI returned an unreadable response.", 502);
  }

  if (!openAIResponse.ok) {
    return jsonError(getOpenAIErrorMessage(openAIResponse.status), openAIResponse.status);
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
