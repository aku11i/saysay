export enum IpcChannels {
  SAY = "SAY",
}

export type SayRequest = {
  message: string;
};

export type SayResponse = void;
