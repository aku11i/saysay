import * as os from "os";
import { contextBridge, ipcRenderer } from "electron";

console.log("preload", os.platform());

type Ipc = {};

const ipc: Ipc = {};

contextBridge.exposeInMainWorld("ipc", ipc);

declare global {
  interface Window {
    ipc: Ipc;
  }
}
