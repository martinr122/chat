const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function sendMessage(
  clientId: string,
  sessionId: string,
  prompt: string
) {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      clientId,
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}
