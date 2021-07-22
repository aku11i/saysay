import { contextBridge, ipcRenderer } from "electron";

import {
  GetVoicesRequest,
  GetVoicesResponse,
  IpcChannels,
  SaveRequest,
  SaveResponse,
  SayRequest,
  SayResponse,
} from "../common/ipcChannels";

type Ipc = {
  say: (req: SayRequest) => Promise<SayResponse>;
  save: (req: SaveRequest) => Promise<SaveResponse>;
  getVoices: (req: GetVoicesRequest) => Promise<GetVoicesResponse>;
};

const ipc: Ipc = {
  say: (req) => ipcRenderer.invoke(IpcChannels.SAY, req),
  save: (req) => ipcRenderer.invoke(IpcChannels.SAVE, req),
  getVoices: (req) => ipcRenderer.invoke(IpcChannels.GET_VOICES, req),
};

contextBridge.exposeInMainWorld("ipc", ipc);

declare global {
  interface Window {
    ipc: Ipc;
  }
}
