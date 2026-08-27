import { createHmac } from "node:crypto";
import { expect, test } from "@playwright/test";

test("the ESM package works in a real browser", async ({ page }) => {
  await page.route("https://api.ltesocks.io/v2/user", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"login":"demo"}' });
  });
  await page.goto("/");
  await expect(page.locator("#status")).toHaveText("ready");

  const body = '{"id":"browser-event"}';
  const secret = "browser-webhook-secret";
  const signature = createHmac("sha256", secret).update(body).digest("base64");
  const result = await page.evaluate(
    async ({ body, secret, signature }) => {
      const sdk = globalThis.LTESocksSDK;
      const client = sdk.LTESocksClient.withBearerToken("browser-token");
      const user = await client.user.get();
      const webhook = await sdk.WebhookVerifier.verify(body, signature, secret);
      return { login: user.login, webhook };
    },
    { body, secret, signature },
  );

  expect(result).toEqual({ login: "demo", webhook: true });
});

declare global {
  var LTESocksSDK: typeof import("../../src/index.js");
}
