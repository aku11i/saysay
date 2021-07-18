import { defineConfig } from "vite";
import * as module from "module";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    outDir: "build",
    lib: {
      entry: "preload/preload.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["electron", ...module.builtinModules],
      output: {
        entryFileNames: "[name].cjs",
      },
    },
    emptyOutDir: false,
  },
});
