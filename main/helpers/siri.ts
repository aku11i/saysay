import { execFile } from "child_process";
import { BrowserWindow, dialog, shell } from "electron";
import * as path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const SAY_COMMAND = "/usr/bin/say";

export const say = async (message: string): Promise<void> => {
  await execFileAsync(SAY_COMMAND, [message]);
};

export const save = async (
  message: string,
  win: BrowserWindow
): Promise<string | void> => {
  const { canceled, filePath } = await dialog.showSaveDialog(win);
  if (canceled || !filePath) return;

  await execFileAsync(SAY_COMMAND, [message, "-o", filePath]);
  shell.openPath(path.dirname(filePath)).catch((e) => console.error(e));

  return filePath;
};
