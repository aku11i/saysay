import { dialog, ipcMain, IpcMainInvokeEvent } from "electron";

import { EchoRequest, EchoResponse, IpcChannels } from "../common/ipcChannels";

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
  handle<EchoRequest, EchoResponse>(IpcChannels.ECHO, async (_event, req) => {
    const { message } = req;
    console.log(message);
  });
};
