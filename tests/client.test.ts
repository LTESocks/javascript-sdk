import { describe, expect, it, vi } from "vitest";
import { ApiError, FileDownload, LTESocksClient } from "../src/index.js";

describe("LTESocksClient", () => {
  it("uses the v2 endpoint, Bearer auth and language", async () => {
    let request: Request | undefined;
    const client = LTESocksClient.withBearerToken("account-token", {
      language: "ru",
      fetch: async (input, init) => {
        request = new Request(input, init);
        return Response.json({ login: "demo" });
      },
    });

    await client.user.get();

    expect(request?.url).toBe("https://api.ltesocks.io/v2/user");
    expect(request?.headers.get("authorization")).toBe("Bearer account-token");
    expect(request?.headers.get("accept-language")).toBe("ru");
  });

  it("returns VPN ZIP files", async () => {
    const client = LTESocksClient.withBearerToken("token", {
      fetch: async () =>
        new Response(new TextEncoder().encode("zip"), {
          headers: {
            "content-type": "application/zip",
            "content-disposition": 'attachment; filename="vpn.zip"',
          },
        }),
    });

    const download = await client.ports.downloadVpn({ id: "10000" });

    expect(download).toBeInstanceOf(FileDownload);
    expect(download.filename).toBe("vpn.zip");
    expect(download.contentType).toBe("application/zip");
    expect(download.text()).toBe("zip");
  });

  it("normalizes API failures and reset timing headers", async () => {
    const client = LTESocksClient.withBearerToken("token", {
      fetch: async () =>
        Response.json(
          { error: "Reset is cooling down" },
          {
            status: 500,
            headers: {
              "retry-after": "42",
              "retry-at": "2026-08-27T12:00:00Z",
              "x-request-id": "request-123",
            },
          },
        ),
    });

    await expect(client.ports.reset({ id: "10000" })).rejects.toMatchObject({
      kind: "server",
      statusCode: 500,
      detail: "Reset is cooling down",
      retryAfter: 42,
      retryAt: "2026-08-27T12:00:00Z",
      requestId: "request-123",
    });
  });

  it("reuses one automatic key for transport retries", async () => {
    const keys: Array<string | null> = [];
    let attempt = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      keys.push(new Request(input, init).headers.get("idempotency-key"));
      attempt += 1;
      if (attempt === 1) throw new TypeError("connection reset");
      return Response.json(
        { port: "10000" },
        { headers: { ETag: '"port-v2"', "Idempotency-Replayed": "true" } },
      );
    });
    const client = LTESocksClient.withBearerToken("token", { fetch: fetchMock });

    const response = await client.ports.resetWithResponse({ id: "10000" });

    expect(keys).toHaveLength(2);
    expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/u);
    expect(keys[1]).toBe(keys[0]);
    expect(response.etag).toBe('"port-v2"');
    expect(response.idempotencyReplayed).toBe(true);
  });

  it("does not retry an HTTP response", async () => {
    let attempts = 0;
    const client = LTESocksClient.withBearerToken("token", {
      fetch: async () => {
        attempts += 1;
        return Response.json({ error: "Unavailable" }, { status: 503 });
      },
    });

    await expect(client.ports.reset({ id: "10000" })).rejects.toBeInstanceOf(ApiError);
    expect(attempts).toBe(1);
  });

  it("supports explicit keys, disabling automatic keys, and raw requests", async () => {
    const requests: Request[] = [];
    const client = new LTESocksClient({
      bearerToken: "token",
      idempotency: false,
      fetch: async (input, init) => {
        requests.push(new Request(input, init));
        return Response.json({ ok: true });
      },
    });

    await client.ports.reset({ id: "10000" });
    await client.ports.reset({
      id: "10000",
      idempotencyKey: "7c838e2d-7d52-42e7-aed1-528829cbd514",
    });
    await client.request("POST", "/future", { query: { page: 2 }, body: { ok: true } });

    expect(requests[0]?.headers.get("idempotency-key")).toBeNull();
    expect(requests[1]?.headers.get("idempotency-key")).toBe(
      "7c838e2d-7d52-42e7-aed1-528829cbd514",
    );
    expect(requests[2]?.url).toBe("https://api.ltesocks.io/v2/future?page=2");
    expect(await requests[2]?.json()).toEqual({ ok: true });
  });

  it("validates configuration", () => {
    expect(() => new LTESocksClient({ baseUrl: "ftp://example.com" })).toThrow(/http/u);
    expect(() => new LTESocksClient({ timeoutMs: -1 })).toThrow(RangeError);
  });
});
