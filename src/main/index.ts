import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  // mainWindow.loadFile(
  //   path.join(app.getAppPath(), "dist", "renderer", "index.html")
  // );
  mainWindow.loadURL("http://localhost:3000");

  mainWindow.webContents.openDevTools();
}

(async () => {
  await app.whenReady();

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });
})();
