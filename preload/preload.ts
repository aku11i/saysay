import { contextBridge, ipcRenderer } from "electron";

import { EchoRequest, EchoResponse, IpcChannels } from "../common/ipcChannels";

type Ipc = {
  echo: (req: EchoRequest) => Promise<EchoResponse>;
};

const ipc: Ipc = {
  echo: (req) => ipcRenderer.invoke(IpcChannels.ECHO, req),
};

contextBridge.exposeInMainWorld("ipc", ipc);

declare global {
  interface Window {
    ipc: Ipc;
  }
}
