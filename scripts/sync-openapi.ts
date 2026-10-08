import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { parse } from "yaml";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const source = resolve(process.argv[2] ?? resolve(root, "../../site/docs/openapi.yaml"));
const content = await readFile(source);
const document = parse(content.toString("utf8")) as OpenApiDocument;

if (document.info?.title !== "LTESocks Public API") {
  throw new Error("Refusing to synchronize a non-public API schema.");
}
if (document.servers?.[0]?.url !== "https://api.ltesocks.io/v2") {
  throw new Error("The public API server is not https://api.ltesocks.io/v2.");
}
if (Object.keys(document.paths ?? {}).some((path) => path.startsWith("/admin"))) {
  throw new Error("The public schema unexpectedly contains admin paths.");
}

const methods = new Set(["get", "post", "put", "patch", "delete"]);
const operations = Object.values(document.paths ?? {}).reduce(
  (total, item) => total + Object.keys(item).filter((method) => methods.has(method)).length,
  0,
);
const schemas = Object.keys(document.components?.schemas ?? {}).length;
if (operations !== 36 || schemas !== 20) {
  throw new Error(`Unexpected contract size: ${operations} operations and ${schemas} schemas.`);
}

let commit = "unknown";
try {
  const result = await execFileAsync(
    "git",
    ["-C", resolve(source, ".."), "log", "-n", "1", "--format=%H", "--", source],
    { encoding: "utf8" },
  );
  const candidate = result.stdout.trim();
  if (/^[0-9a-f]{40}$/u.test(candidate)) commit = candidate;
} catch {
  // A source outside a Git checkout is valid; its digest still pins the contract.
}

const digest = createHash("sha256").update(content).digest("hex");
await writeFile(resolve(root, "openapi/openapi.yaml"), content);
await writeFile(
  resolve(root, "openapi/source.json"),
  `${JSON.stringify(
    {
      commit,
      operations,
      repository: "LTESocks/docs",
      schemas,
      sha256: digest,
      source: source.split("/").at(-1) ?? "openapi.yaml",
    },
    undefined,
    2,
  )}\n`,
);

console.log(`Synced ${operations} operations and ${schemas} schemas (${digest.slice(0, 12)}).`);

interface OpenApiDocument {
  info?: { title?: string };
  servers?: Array<{ url?: string }>;
  paths?: Record<string, Record<string, unknown>>;
  components?: { schemas?: Record<string, unknown> };
}
