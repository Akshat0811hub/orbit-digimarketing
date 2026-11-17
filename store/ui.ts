import { create } from "zustand";
export const useUI = create<{
  menu: boolean;
  setMenu: (v: boolean) => void;
  cursor: string;
  setCursor: (v: string) => void;
  loaded: boolean;
  setLoaded: () => void;
}>((set) => ({
  menu: false,
  setMenu: (menu) => set({ menu }),
  cursor: "",
  setCursor: (cursor) => set({ cursor }),
  loaded: false,
  setLoaded: () => set({ loaded: true }),
}));
