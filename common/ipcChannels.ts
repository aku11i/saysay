export enum IpcChannels {
  ECHO = "ECHO", // An example of IPC channel
}

export type EchoRequest = {
  message: string;
};

export type EchoResponse = void;
