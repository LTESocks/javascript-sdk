# API behavior

## Pagination

Filtered ports, logs, and payments use a JSON body with `page` and `pageSize` (maximum 100). Responses contain `data`, `page`, `pageSize`, and `total`.

```ts
const page = await client.ports.filter({ body: { page: 1, pageSize: 100 } });
```

## Rate limits

Default service limits are 60 GET requests/minute and 10 mutation requests/minute, but deployments can override them. Treat `429` and its response metadata as authoritative. The SDK does not retry HTTP responses automatically.

## Reserved payment operations

`payments.listCurrencies()` and `payments.request()` exist so the SDK covers the complete v2 contract, but the contract currently marks both as under development and declares no normal success payload. Do not build production workflows around them yet.

## Compatibility operations

Use `ports.delete()` and `ports.downloadVpn()` for new code. The `deleteCompat()` and `downloadVpnCompat()` POST methods mirror compatibility endpoints.

## Identifiers

Use the `Port.port` value as `{id}` in port routes. A `resetToken` is only for `ports.resolveResetToken()` and does not replace Bearer authentication.
