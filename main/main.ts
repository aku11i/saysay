import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./mainWindow";

(async () => {
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
