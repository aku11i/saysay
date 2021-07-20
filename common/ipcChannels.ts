export enum IpcChannels {
  SAY = "SAY",
  SAVE = "SAVE",
}

export type SayRequest = {
  message: string;
};

export type SayResponse = void;

export type SaveRequest = {
  message: string;
};

export type SaveResponse = string | void;
