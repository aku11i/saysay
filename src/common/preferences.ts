import Store from "electron-store";

type Preferences = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const preferences = new Store<Partial<Preferences>>();
