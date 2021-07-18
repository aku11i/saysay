import { app, BrowserWindow } from "electron";
import * as path from "path";
import { preferences } from "../common/preferences";

const createWindow = async () => {
  const { x, y, width, height } = preferences.store;

  const mainWindow = new BrowserWindow({
    x,
    y,
    width: width || 800,
    height: height || 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), "build", "preload.cjs"),
    },
    show: false,
  });

  mainWindow.on("close", () => {
    const [x, y] = mainWindow.getPosition();
    const [width, height] = mainWindow.getSize();
    preferences.set("x", x);
    preferences.set("y", y);
    preferences.set("width", width);
    preferences.set("height", height);
  });

  if (app.isPackaged) {
    await mainWindow.loadFile(
      path.join(app.getAppPath(), "build", "index.html")
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
