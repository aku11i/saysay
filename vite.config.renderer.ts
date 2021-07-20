import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  root: __dirname,
  base: "",
  build: {
    outDir: "build",
    emptyOutDir: false,
  },
  esbuild: {
    jsxInject: `import React from "react";`,
  },
});
