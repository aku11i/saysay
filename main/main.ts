import { app, BrowserWindow } from "electron";
import { registerIpcHandlers } from "./ipcHandler";
import { createMainWindow } from "./mainWindow";

(async () => {
  registerIpcHandlers();

  await app.whenReady();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createMainWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  await createMainWindow();
})();
