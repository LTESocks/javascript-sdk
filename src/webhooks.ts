import { InvalidSignatureError } from "./errors.js";

const encoder = new TextEncoder();

/** Verifies the Base64(HMAC-SHA256(secret, raw request body)) value from X-Signature. */
export class WebhookVerifier {
  static async verify(
    rawBody: string | Uint8Array | ArrayBuffer,
    signature: string,
    secret: string,
  ): Promise<boolean> {
    if (!signature || !secret) return false;
    const body = bodyBytes(rawBody);
    let candidate: Uint8Array;
    try {
      candidate = base64Bytes(signature.trim());
    } catch {
      return false;
    }
    try {
      const key = await globalThis.crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const expected = new Uint8Array(
        await globalThis.crypto.subtle.sign("HMAC", key, body.slice().buffer),
      );
      return constantTimeEqual(expected, candidate);
    } catch {
      return false;
    }
  }

  static async verifyOrThrow(
    rawBody: string | Uint8Array | ArrayBuffer,
    signature: string,
    secret: string,
  ): Promise<void> {
    if (!(await WebhookVerifier.verify(rawBody, signature, secret))) {
      throw new InvalidSignatureError("The LTESocks webhook signature is invalid.");
    }
  }

  static async decodeVerifiedJson<Payload = Record<string, unknown>>(
    rawBody: string | Uint8Array | ArrayBuffer,
    signature: string,
    secret: string,
  ): Promise<Payload> {
    await WebhookVerifier.verifyOrThrow(rawBody, signature, secret);
    const text =
      typeof rawBody === "string" ? rawBody : new TextDecoder().decode(bodyBytes(rawBody));
    const payload: unknown = JSON.parse(text);
    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
      throw new TypeError("The verified webhook payload must be a JSON object.");
    }
    return payload as Payload;
  }
}

function bodyBytes(value: string | Uint8Array | ArrayBuffer): Uint8Array {
  if (typeof value === "string") return encoder.encode(value);
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}

function base64Bytes(value: string): Uint8Array {
  if (!/^[A-Za-z\d+/]+={0,2}$/u.test(value)) throw new TypeError("Invalid Base64 signature.");
  if (typeof globalThis.atob === "function") {
    return Uint8Array.from(globalThis.atob(value), (character) => character.charCodeAt(0));
  }
  throw new TypeError("A Base64 decoder is required.");
}

function constantTimeEqual(expected: Uint8Array, candidate: Uint8Array): boolean {
  let difference = expected.byteLength ^ candidate.byteLength;
  const length = Math.max(expected.byteLength, candidate.byteLength);
  for (let index = 0; index < length; index += 1) {
    difference |= (expected[index] ?? 0) ^ (candidate[index] ?? 0);
  }
  return difference === 0;
}
