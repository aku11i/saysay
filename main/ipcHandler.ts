import { ipcMain, IpcMainInvokeEvent } from "electron";
import { IpcChannels, SayRequest, SayResponse } from "../common/ipcChannels";

import { say } from "./helpers/siri";

const handle = <Req, Res>(
  channel: IpcChannels,
  callback: (event: IpcMainInvokeEvent, req: Req) => Promise<Res>
) => {
  ipcMain.handle(channel, callback);
};

export const registerIpcHandlers = () => {
  handle<SayRequest, SayResponse>(IpcChannels.SAY, async (_event, req) => {
    await say(req.message);
  });
};
