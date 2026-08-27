import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { InvalidSignatureError, WebhookVerifier } from "../src/index.js";

describe("WebhookVerifier", () => {
  const body = '{"id":"evt-1","type":"port.ip_changed"}';
  const secret = "webhook-secret";
  const signature = createHmac("sha256", secret).update(body).digest("base64");

  it("verifies Base64 HMAC over the exact body", async () => {
    await expect(WebhookVerifier.verify(body, signature, secret)).resolves.toBe(true);
    await expect(WebhookVerifier.verify(`${body} `, signature, secret)).resolves.toBe(false);
  });

  it("verifies before JSON decoding", async () => {
    await expect(
      WebhookVerifier.decodeVerifiedJson<{ id: string }>(body, signature, secret),
    ).resolves.toMatchObject({ id: "evt-1" });
    await expect(WebhookVerifier.verifyOrThrow(body, "invalid", secret)).rejects.toBeInstanceOf(
      InvalidSignatureError,
    );
  });
});
