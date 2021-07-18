import { app, BrowserWindow } from "electron";
import * as path from "path";
import { APP_NAME, isDev } from "../common/env";
import { preferences } from "../common/preferences";

export const createMainWindow = async (): Promise<BrowserWindow> => {
  const { x, y, width, height } = preferences.store;

  const win = new BrowserWindow({
    title: APP_NAME,
    x,
    y,
    width: width || 800,
    height: height || 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), "build", "preload.cjs"),
    },
    show: false,
  });

  win.on("close", () => {
    const [x, y] = win.getPosition();
    const [width, height] = win.getSize();
    preferences.set("x", x);
    preferences.set("y", y);
    preferences.set("width", width);
    preferences.set("height", height);
  });

  if (import.meta.env.MODE === "development") {
    await win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.showInactive();
  } else {
    await win.loadFile(path.join(app.getAppPath(), "build", "index.html"));
    win.show();
  }

  return win;
};
