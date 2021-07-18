import { defineConfig } from "vite";
import * as module from "module";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  root: __dirname,
  base: __dirname + "/",
  build: {
    outDir: "dist",
    target: "node14",
    lib: {
      entry: "src/index",
      name: "index",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["electron", ...module.builtinModules],
      output: {
        entryFileNames: "[name].cjs",
      },
    },
  },
});
