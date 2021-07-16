import { app, BrowserWindow } from "electron";
import * as path from "path";

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
    show: false,
  });

  if (app.isPackaged) {
    await mainWindow.loadFile(
      path.join(app.getAppPath(), "build", "renderer", "index.html")
    );
    mainWindow.show();
  } else {
    await mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
    mainWindow.showInactive();
  }
};

(async () => {
  await app.whenReady();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  await createWindow();
})();
