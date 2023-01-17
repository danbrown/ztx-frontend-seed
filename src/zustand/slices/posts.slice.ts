import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

// SWR
export const SWR_POSTS_KEY = "https://jsonplaceholder.typicode.com/posts";

export interface PostsSlice {
  posts: any;
  testPromise: () => Promise<string>;
}

export const createPostsSlice: StateCreator<
  ZustandStoreState,
  [],
  [],
  PostsSlice
> = (set) => ({
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
