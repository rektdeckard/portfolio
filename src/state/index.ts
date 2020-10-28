import { atom } from "recoil";

export const openPanelAtom = atom<number | false>({
  key: "openPanel",
  default: false,
});
