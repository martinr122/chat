import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.CHAT_API_BASE_URL ||
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://chatbot-n21u.onrender.com";

const CHAT_API_URL = `${API_BASE_URL.replace(/\/$/, "")}/api/chat`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
