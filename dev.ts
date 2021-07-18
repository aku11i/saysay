import * as childProcess from "child_process";
import * as module from "module";
import * as path from "path";
import * as url from "url";

// @ts-ignore
const require = module.createRequire(import.meta.url);
//@ts-ignore
const ROOT = path.dirname(url.fileURLToPath(import.meta.url));

const chokidar = require("chokidar") as typeof import("chokidar");
const chalk = require("chalk") as typeof import("chalk");
const vite = require("vite") as typeof import("vite");

const watchDirs = [
  path.join(ROOT, "build", "main.cjs"),
  path.join(ROOT, "build", "preload.cjs"),
];

(async () => {
  let electronProcess: childProcess.ChildProcess | undefined;

  const restartElectron = () => {
    if (electronProcess && !electronProcess.killed) {
      electronProcess.kill();
      electronProcess = undefined;
    }

    electronProcess = childProcess.spawn("npm", ["start"], {
      stdio: "inherit",
    });
  };

  await vite.build({
    configFile: path.join(ROOT, "vite.config.main.ts"),
    build: { watch: {}, sourcemap: "inline" },
  });

  await vite.build({
    configFile: path.join(ROOT, "vite.config.preload.ts"),
    build: { watch: {}, sourcemap: "inline" },
  });

  const server = await vite.createServer({
    configFile: path.join(ROOT, "vite.config.renderer.ts"),
    server: {
      port: 3000,
    },
    build: { sourcemap: "inline" },
  });

  await server.listen();

  await new Promise((r) => setTimeout(r, 3000));

  chokidar.watch(watchDirs).on("all", (event, path) => {
    if (event !== "add" && event !== "change") return;
    console.log(chalk.yellow(`[${event}] ${path}`));
    restartElectron();
  });
})();
