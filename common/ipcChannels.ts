import { Voice } from "../@types/voice";

export enum IpcChannels {
  SAY = "SAY",
  SAVE = "SAVE",
  GET_VOICES = "GET_VOICES",
}

export type SayRequest = {
  message: string;
  voice: Voice;
};

export type SayResponse = void;

export type SaveRequest = {
  message: string;
  voice: Voice;
};

export type SaveResponse = string | void;

export type GetVoicesRequest = void;

export type GetVoicesResponse = Voice[];
