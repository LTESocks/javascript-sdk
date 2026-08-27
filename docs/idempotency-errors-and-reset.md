# Idempotency, errors, and port reset timing

The SDK automatically adds an `Idempotency-Key` UUID to the ten mutations that declare the header in OpenAPI. A new business action gets a new key; an exact retry must reuse the original key.

Automatic retry is intentionally narrow: a protected request can make at most three attempts, and only when the transport failed before an HTTP response arrived. A `4xx` or `5xx` response is returned immediately as `ApiError`.

```ts
const response = await client.ports.resetWithResponse({ id: "10000" });

if (response.idempotencyReplayed) {
  console.log("The API replayed the stored result.");
}
```

To preserve a request across process restarts, generate and store the UUID in the application:

```ts
await client.ports.reset({
  id: "10000",
  idempotencyKey: crypto.randomUUID(),
});
```

## Reset timing

- A successful `POST /ports/{id}/reset` acknowledges the request; it does not prove that the new IP is ready.
- User-triggered resets have a minimum 60-second cooldown. Pool configuration can require longer.
- `Retry-After` contains whole seconds and `Retry-At` contains an RFC 3339 deadline. If both exist, wait until the later deadline.
- There is no fixed end-to-end IP rotation duration. Prefer the `port.ip_changed` webhook; otherwise poll `ports.get()` with bounded backoff and compare `ip`.
- Automatic reset values `1..179` can be stored but are below the scheduler threshold. Use `0` to disable or at least `180` seconds for supported scheduling.

```ts
try {
  await client.ports.reset({ id: "10000" });
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.statusCode, error.retryAfter, error.retryAt);
    console.log(error.headers, error.rawBody);
  }
}
```

The complete operational contract is documented in [Port reset and readiness](https://docs.ltesocks.io/guides/port-reset-and-readiness/) and [Idempotency and safe retries](https://docs.ltesocks.io/fundamentals/idempotency-and-retries/).
