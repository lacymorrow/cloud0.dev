/**
 * LemonSqueezy webhook IDOR via `custom_data.user_id`.
 *
 * `custom_data` is populated from the checkout query string, which the buyer
 * controls end to end. The handler used to resolve the buyer from
 * `custom_data.user_id` alone, so anyone could set
 * `checkout[custom][user_id]=<victim-id>`, pay for the product themselves,
 * and have the purchase credited to the victim's account.
 *
 * The only identity the webhook can trust is the HMAC-verified billing email.
 * These tests pin the fixed contract: the hint is honored only when the hinted
 * user's email matches that verified email.
 *
 * Ported from lacymorrow/shipkit 78415b16 (plan 002, #223).
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const VICTIM_ID = "victim-user-id";
const VICTIM_EMAIL = "victim@example.com";
const ATTACKER_EMAIL = "attacker@evil.com";

/** Rows the mocked `db.query.users.findFirst` can return, keyed by id. */
const usersById = new Map<string, { id: string; email: string }>();

/** Records what `findOrCreateUserByEmail` was asked for, so the fallback is observable. */
const findOrCreateUserByEmail = vi.fn(async (email: string) => ({
  user: { id: `user-for-${email.toLowerCase()}`, email: email.toLowerCase() },
  created: true,
}));

vi.mock("@/server/db", () => ({
  db: {
    query: {
      users: {
        // The real call filters with drizzle's `eq`; the id is recovered from
        // the captured condition so the mock stays independent of drizzle internals.
        findFirst: vi.fn(async ({ where }: { where: unknown }) => {
          const id = extractId(where);
          return id ? usersById.get(id) : undefined;
        }),
      },
    },
  },
}));

vi.mock("@/server/services/user-service", () => ({
  userService: { findOrCreateUserByEmail },
}));

vi.mock("@/server/services/payment-service", () => ({
  PaymentService: { createPayment: vi.fn() },
}));

vi.mock("@/lib/logger", () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock("@/env", () => ({
  env: { LEMONSQUEEZY_WEBHOOK_SECRET: "test-secret" },
}));

/** Pulls the compared value out of a drizzle `eq(users.id, value)` condition. */
function extractId(where: unknown): string | undefined {
  const params = (where as { queryChunks?: unknown[] })?.queryChunks ?? [];
  for (const chunk of params) {
    const value = (chunk as { value?: unknown })?.value;
    if (typeof value === "string") return value;
  }
  return undefined;
}

const { findOrCreateUser } = await import("@/app/(app)/webhooks/lemonsqueezy/route");

describe("LemonSqueezy webhook findOrCreateUser", () => {
  beforeEach(() => {
    usersById.clear();
    usersById.set(VICTIM_ID, { id: VICTIM_ID, email: VICTIM_EMAIL });
    findOrCreateUserByEmail.mockClear();
  });

  it("rejects a custom_data.user_id whose email does not match the webhook email", async () => {
    // The attack: pay as yourself, hand over the victim's id as the hint.
    const resolved = await findOrCreateUser(ATTACKER_EMAIL, null, { user_id: VICTIM_ID });

    expect(resolved).not.toBe(VICTIM_ID);
    expect(findOrCreateUserByEmail).toHaveBeenCalledWith(ATTACKER_EMAIL, { name: null });
  });

  it("honors a custom_data.user_id whose email matches the webhook email", async () => {
    // The legitimate path: checkout passes the signed-in user's id, and the
    // billing email is that user's email.
    const resolved = await findOrCreateUser(VICTIM_EMAIL, null, { user_id: VICTIM_ID });

    expect(resolved).toBe(VICTIM_ID);
    expect(findOrCreateUserByEmail).not.toHaveBeenCalled();
  });

  it("compares the emails case-insensitively", async () => {
    // LemonSqueezy sends the address as the buyer typed it. A case-sensitive
    // check would break the legitimate path above.
    const resolved = await findOrCreateUser("Victim@Example.COM", null, { user_id: VICTIM_ID });

    expect(resolved).toBe(VICTIM_ID);
  });

  it("falls back to the email lookup when there is no hint", async () => {
    await findOrCreateUser(VICTIM_EMAIL, null, undefined);

    expect(findOrCreateUserByEmail).toHaveBeenCalledWith(VICTIM_EMAIL, { name: null });
  });

  it("falls back to the email lookup when the hint points at no row", async () => {
    // A stale or invented id must not throw and must not be used as-is.
    const resolved = await findOrCreateUser(VICTIM_EMAIL, null, { user_id: "no-such-user" });

    expect(resolved).not.toBe("no-such-user");
    expect(findOrCreateUserByEmail).toHaveBeenCalledWith(VICTIM_EMAIL, { name: null });
  });
});
