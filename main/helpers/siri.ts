import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const SAY_COMMAND = "/usr/bin/say";

export const say = async (message: string): Promise<void> => {
  await execFileAsync(SAY_COMMAND, [message]);
};
