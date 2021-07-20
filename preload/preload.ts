import { contextBridge, ipcRenderer } from "electron";
import { IpcChannels, SayRequest, SayResponse } from "../common/ipcChannels";

type Ipc = {
  say: (req: SayRequest) => Promise<SayResponse>;
};

const ipc: Ipc = {
  say: (req) => ipcRenderer.invoke(IpcChannels.SAY, req),
};

contextBridge.exposeInMainWorld("ipc", ipc);

declare global {
  interface Window {
    ipc: Ipc;
  }
}
