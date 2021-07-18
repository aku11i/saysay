import * as module from "module";
import * as path from "path";
import * as url from "url";

// @ts-ignore
const require = module.createRequire(import.meta.url);
//@ts-ignore
const ROOT = path.dirname(url.fileURLToPath(import.meta.url));

const vite = require("vite") as typeof import("vite");

(async () => {
  await vite.build({
    configFile: path.join(ROOT, "packages", "main", "vite.config.ts"),
  });

  await vite.build({
    configFile: path.join(ROOT, "packages", "preload", "vite.config.ts"),
  });

  await vite.build({
    configFile: path.join(ROOT, "packages", "renderer", "vite.config.ts"),
  });
})();
