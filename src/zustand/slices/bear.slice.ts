import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

export interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export const createBearSlice: StateCreator<
  ZustandStoreState,
  [],
  [],
  BearSlice
> = (set) => ({
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
