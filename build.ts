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
    configFile: path.join(ROOT, "vite.config.main.ts"),
  });

  await vite.build({
    configFile: path.join(ROOT, "vite.config.preload.ts"),
  });

  await vite.build({
    configFile: path.join(ROOT, "vite.config.renderer.ts"),
  });
})();
