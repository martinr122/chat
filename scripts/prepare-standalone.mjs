import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const standaloneDir = join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  console.warn("Standalone output not found. Skipping static asset copy.");
  process.exit(0);
}

copyIfExists(join(root, "public"), join(standaloneDir, "public"));
copyIfExists(
  join(root, ".next", "static"),
  join(standaloneDir, ".next", "static"),
);

function copyIfExists(source, destination) {
  if (!existsSync(source)) return;

  rmSync(destination, { force: true, recursive: true });
  cpSync(source, destination, { recursive: true });
}
