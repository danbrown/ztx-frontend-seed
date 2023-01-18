import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

// SWR
export const SWR_POSTS_KEY = "https://jsonplaceholder.typicode.com/posts";

// Zustand
export const sliceName = "posts";

export const initialState: OmittedFunctionKeys<SliceType> = {
  posts: [],
};

export interface SliceType {
  posts: any;
  testPromise: () => Promise<string>;
}

export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set
) => ({
  posts: [],

  testPromise: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello World");
      }, 1000);
    });
  },

  // SWR
  setPosts: (posts) => {
    set({ posts });
  },
});
