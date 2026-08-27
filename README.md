# LTESocks JavaScript SDK

[![CI](https://github.com/LTESocks/javascript-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/LTESocks/javascript-sdk/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-339933?logo=node.js&logoColor=white)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](tsconfig.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

The official TypeScript client for the [LTESocks Public API v2](https://docs.ltesocks.io/). It provides typed models and resource methods for account preferences, mobile proxy ports, payments, plans, servers, and network signatures.

> Package publication has not started yet. The repository is production-ready, but `@ltesocks/sdk` is intentionally not available on npm until the first release is approved.

## Installation for development

```bash
git clone https://github.com/LTESocks/javascript-sdk.git
cd javascript-sdk
npm ci
npm run build
```

After the first npm release, installation will be:

```bash
npm install @ltesocks/sdk
```

## Quick start

Keep the account token in trusted server-side code.

```ts
import { LTESocksClient } from "@ltesocks/sdk";

const client = LTESocksClient.withBearerToken(process.env.LTESOCKS_API_TOKEN!);

const user = await client.user.get();
const catalog = await client.general.listPlans();
const ports = await client.ports.list();

console.log(user.login, catalog.plans, ports.total);
```

The default endpoint is `https://api.ltesocks.io/v2`. A private/test deployment can be selected with `baseUrl`:

```ts
const client = new LTESocksClient({
  bearerToken: process.env.LTESOCKS_API_TOKEN,
  baseUrl: "https://api.example.test/v2",
  language: "en",
  timeoutMs: 30_000,
});
```

## Resources

| Resource | Purpose |
| --- | --- |
| `client.user` | Read the current account and update preferences |
| `client.ports` | List, filter, order, update, reset, delete, and download VPN archives |
| `client.payments` | List/filter payment history and access reserved payment operations |
| `client.general` | List plans, servers, and signatures |

Every operation has a `method()` returning data and a `methodWithResponse()` variant returning status, headers, ETag, and `idempotencyReplayed` metadata. See the generated [resource reference](src/generated/resources.ts) and the [API reference](https://docs.ltesocks.io/api-reference/).

## Idempotency and retries

For the ten mutations that accept `Idempotency-Key`, the SDK creates a UUID automatically. The same key is reused for at most three attempts when the connection fails before any HTTP response is received. HTTP errors are never retried automatically.

```ts
const result = await client.ports.resetWithResponse({ id: "10000" });
console.log(result.idempotencyReplayed, result.headers["retry-at"]);
```

Supply `idempotencyKey` to continue a logical request across application restarts, or set `idempotency: false` to disable automatic keys. Read [idempotency, errors, and reset timing](docs/idempotency-errors-and-reset.md).

## Errors

```ts
import { ApiError } from "@ltesocks/sdk";

try {
  await client.ports.reset({ id: "10000" });
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.statusCode, error.kind, error.detail);
    console.error(error.retryAfter, error.retryAt, error.idempotencyKey);
  }
}
```

`ApiError` preserves normalized headers and raw response bytes. Use the raw `client.request()` escape hatch for a newly added endpoint that is not in the pinned contract yet.

## VPN archives

```ts
const archive = await client.ports.downloadVpn({ id: "10000" });
await archive.saveTo("./ltesocks-vpn.zip"); // Node.js
```

The returned `FileDownload` also exposes `content`, `filename`, and `contentType`.

## Webhooks

Verify the exact request bytes before parsing JSON. LTESocks sends `Base64(HMAC-SHA256(webhook_secret, raw_body))` in `X-Signature`.

```ts
import { WebhookVerifier } from "@ltesocks/sdk";

const event = await WebhookVerifier.decodeVerifiedJson(
  rawRequestBody,
  request.headers.get("x-signature") ?? "",
  process.env.LTESOCKS_WEBHOOK_SECRET!,
);
```

See [webhook verification](docs/webhooks.md).

## Development

```bash
npm ci
npm run verify
npm run test:browser
```

Generated types and resources are pinned to [`openapi/openapi.yaml`](openapi/openapi.yaml). Run `npm run sync:openapi -- ../../site/docs/openapi.yaml` and `npm run generate` after the canonical contract changes.

## Links

- [Documentation](https://docs.ltesocks.io/)
- [API reference](https://docs.ltesocks.io/api-reference/)
- [OpenAPI YAML](https://docs.ltesocks.io/openapi.yaml)
- [Python SDK](https://github.com/LTESocks/python-sdk)
- [PHP SDK](https://github.com/LTESocks/php-sdk)
- [Security policy](SECURITY.md)
- [Contributing](CONTRIBUTING.md)

Licensed under the [MIT License](LICENSE).
