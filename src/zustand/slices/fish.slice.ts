import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

// Zustand
export const sliceName = "fishes";

export const initialState: OmittedFunctionKeys<SliceType> = {
  fishes: 0,
};

export interface SliceType {
  fishes: number;
  addFish: () => void;
}

export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set
) => ({
  fishes: 0,
  addFish: () =>
    set((state) => ({
      fishes: state.fishes + 1,
    })),
});
