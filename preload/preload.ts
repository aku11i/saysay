import { contextBridge, ipcRenderer } from "electron";
import {
  IpcChannels,
  SaveRequest,
  SaveResponse,
  SayRequest,
  SayResponse,
} from "../common/ipcChannels";

type Ipc = {
  say: (req: SayRequest) => Promise<SayResponse>;
  save: (req: SaveRequest) => Promise<SaveResponse>;
};

const ipc: Ipc = {
  say: (req) => ipcRenderer.invoke(IpcChannels.SAY, req),
  save: (req) => ipcRenderer.invoke(IpcChannels.SAVE, req),
};

contextBridge.exposeInMainWorld("ipc", ipc);

declare global {
  interface Window {
    ipc: Ipc;
  }
}
