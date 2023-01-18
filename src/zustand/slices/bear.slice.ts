import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

// Zustand
export const sliceName = "bears";

export const initialState: OmittedFunctionKeys<SliceType> = {
  bears: 0,
};

export interface SliceType {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set
) => ({
  bears: 0,
  addBear: () =>
    set((state) => ({
      bears: state.bears + 1,
    })),

  eatFish: () =>
    set((state) => ({
      fishes: state.fishes - 1,
    })),
});
