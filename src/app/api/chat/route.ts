import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.CHAT_API_BASE_URL ||
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://chatbot-n21u.onrender.com";

const CHAT_API_URL = `${normalizeApiBaseUrl(API_BASE_URL)}/api/chat`;

function normalizeApiBaseUrl(url: string): string {
  return url
    .trim()
    .replace(/\/$/, "")
    .replace(".render.com", ".onrender.com");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: createBackendHeaders(request),
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "Backend error" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat proxy error:", error);

    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}

function createBackendHeaders(request: Request): Headers {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  copyHeader(request, headers, "user-agent");
  copyHeader(request, headers, "x-real-ip");

  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    headers.set("x-forwarded-for", forwardedFor);
  } else if (realIp) {
    headers.set("x-forwarded-for", realIp);
  }

  return headers;
}

function copyHeader(request: Request, headers: Headers, name: string) {
  const value = request.headers.get(name);

  if (value) {
    headers.set(name, value);
  }
}
