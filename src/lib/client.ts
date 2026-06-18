import { createUuid } from "@/lib/uuid";

const CLIENT_KEY = "upjs-client-id";

export function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";

  let clientId = localStorage.getItem(CLIENT_KEY);

  if (!clientId) {
    clientId = createUuid();
    localStorage.setItem(CLIENT_KEY, clientId);
  }

  return clientId;
}
