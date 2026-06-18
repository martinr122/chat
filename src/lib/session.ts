import { createUuid } from "@/lib/uuid";

export function createSessionId(): string {
  return createUuid();
}
