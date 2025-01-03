import { Doc } from "./_generated/dataModel";

export const DURATIONS = {
  TICKET_OFFER: 30 * 60 * 1000,
} as const;

export const WAITING_LIST_STATUS: Record<string, Doc<"waitingList">["status"]> =
  {
    WAITING: "waiting",
    OFFERED: "offered",
    PURCHASED: "purchased",
    EXPIRED: "expired",
  };

export const TICKET_STATUS: Record<string, Doc<"tickets">["status"]> = {
  VALID: "valid",
  USED: "used",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;
