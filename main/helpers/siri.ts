import { execFile } from "child_process";
import { BrowserWindow, dialog, shell } from "electron";
import filenamify from "filenamify";
import { promises as fs } from "fs";
import * as path from "path";
import { promisify } from "util";

import { Voice } from "../../@types/voice";
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

export type SayProps = {
  message: string;
  voice: Voice;
};

export const say = async ({ message, voice }: SayProps): Promise<void> => {
  await searchSayCommand();

  await execFileAsync(SAY_COMMAND, [message, "--voice", voice.name]);
};

export type SaveProps = {
  message: string;
  voice: Voice;
  win: BrowserWindow;
};

export const save = async ({
  message,
  voice,
  win,
}: SaveProps): Promise<string | void> => {
  await searchSayCommand();

  const defaultPath = filenamify(`${voice.name}_${voice.locale}_${message}`, {
    replacement: "_",
  });

  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    defaultPath,
  });
  if (canceled || !filePath) return;

  await execFileAsync(SAY_COMMAND, [
    message,
    "--voice",
    voice.name,
    "-o",
    filePath,
  ]);
  shell.openPath(path.dirname(filePath)).catch((e) => console.error(e));

  return filePath;
};

export const getVoices = async (): Promise<Voice[]> => {
  await searchSayCommand();

  const { stdout } = await execFileAsync(SAY_COMMAND, ["--voice", "?"]);

  const lines = stdout.split("\n").filter(Boolean);

  const parseLine = (line: string): Voice => {
    const [name, locale] = line.split(/\s+/);

    const descriptionPrefix = "# ";
    const description = line.substring(
      line.indexOf(descriptionPrefix) + descriptionPrefix.length
    );

    return { name, locale, description };
  };

  return lines.map(parseLine);
};
