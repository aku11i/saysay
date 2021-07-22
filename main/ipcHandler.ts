import { BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from "electron";

import {
  GetVoicesRequest,
  GetVoicesResponse,
  IpcChannels,
  SaveRequest,
  SaveResponse,
  SayRequest,
  SayResponse,
} from "../common/ipcChannels";
import { getVoices, save, say } from "./helpers/siri";

const handle = <Req, Res>(
  channel: IpcChannels,
  callback: (event: IpcMainInvokeEvent, req: Req) => Promise<Res>
) => {
  ipcMain.handle(channel, (event, req) =>
    callback(event, req).catch((e) => {
      dialog.showErrorBox("Error", e.message);
      throw e;
    })
  );
};

export const registerIpcHandlers = (): void => {
  handle<SayRequest, SayResponse>(IpcChannels.SAY, async (_event, req) => {
    const { message, voice } = req;
    await say({ message, voice });
  });

  handle<SaveRequest, SaveResponse>(IpcChannels.SAVE, async (event, req) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const { message, voice } = req;

    if (!win) {
      throw new Error("BrowserWindow was not found.");
    }

    await save({ message, voice, win });
  });

  handle<GetVoicesRequest, GetVoicesResponse>(
    IpcChannels.GET_VOICES,
    async () => {
      return await getVoices();
    }
  );
};
