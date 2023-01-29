import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

export type ThemeVariants = "light" | "dark" | "cosmic";

// Zustand
export const sliceName = "settings";

export const initialState: OmittedFunctionKeys<SliceType> = {
  currentTheme: "dark",
  currentLanguage: "en",
};

export interface SliceType {
  currentTheme: ThemeVariants;
  setCurrentTheme: (theme: ThemeVariants) => void;

  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
}

export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set
) => ({
  // @ THEME
  currentTheme: "dark",

  setCurrentTheme: (theme: ThemeVariants) => {
    set({ currentTheme: theme });
  },

  // @ LANGUAGE
  currentLanguage: "en",
  setCurrentLanguage: (language: string) => {
    set({ currentLanguage: language });
  },
});
