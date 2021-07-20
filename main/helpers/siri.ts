import { execFile } from "child_process";
import { BrowserWindow, dialog, shell } from "electron";
import filenamify from "filenamify";
import { promises as fs } from "fs";
import * as path from "path";
import { promisify } from "util";

import { CommandNotFoundError } from "../../common/errors/CommandNotFoundError";

const execFileAsync = promisify(execFile);

const SAY_COMMAND = "/usr/bin/say";

const searchSayCommand = async () => {
  try {
    await fs.stat(SAY_COMMAND);
  } catch (e) {
    throw new CommandNotFoundError(`Command "${SAY_COMMAND}" is not found.`);
  }
};

export const say = async (message: string): Promise<void> => {
  await searchSayCommand();

  await execFileAsync(SAY_COMMAND, [message]);
};

export const save = async (
  message: string,
  win: BrowserWindow
): Promise<string | void> => {
  await searchSayCommand();

  const defaultPath = filenamify(message, { replacement: "_" });

  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    defaultPath,
  });
  if (canceled || !filePath) return;

  await execFileAsync(SAY_COMMAND, [message, "-o", filePath]);
  shell.openPath(path.dirname(filePath)).catch((e) => console.error(e));

  return filePath;
};
