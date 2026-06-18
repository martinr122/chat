export async function sendMessage(
  clientId: string,
  sessionId: string,
  prompt: string
) {
  const response = await fetch("/api/chat", {
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
