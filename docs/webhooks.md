# Webhook verification

LTESocks signs the exact HTTP request body and sends the Base64 signature in `X-Signature`:

```text
Base64(HMAC-SHA256(webhook_secret, raw_request_body))
```

Do not parse, stringify, trim, or otherwise change the bytes before verification.

```ts
const rawBody = new Uint8Array(await request.arrayBuffer());
const signature = request.headers.get("x-signature") ?? "";

const event = await WebhookVerifier.decodeVerifiedJson(
  rawBody,
  signature,
  process.env.LTESOCKS_WEBHOOK_SECRET!,
);
```

Store the event `id` before side effects. Deliveries can be repeated, so return `2xx` for an already processed ID without repeating the action. The default delivery policy permits the initial request plus three retries, separated by 10 seconds, with 5-second connection/write/read timeouts.

See the [event envelope and endpoint requirements](https://docs.ltesocks.io/webhooks/).
