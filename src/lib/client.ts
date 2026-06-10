const CLIENT_KEY = "upjs-client-id";

export function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";

  let clientId = localStorage.getItem(CLIENT_KEY);

  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(CLIENT_KEY, clientId);
  }

  return clientId;
}