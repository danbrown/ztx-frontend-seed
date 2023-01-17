import { useEffect, useState } from "react";
import { UnionToIntersection } from "@customTypes/UnionToIntersection.type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import useSwr, { SWRResponse } from "swr";

// Slices
import { BearSlice, createBearSlice } from "./slices/bear.slice";
import { FishSlice, createFishSlice } from "./slices/fish.slice";
import { PostsSlice, createPostsSlice } from "./slices/posts.slice";
import { GetFunctionKeys } from "@customTypes/GetFunctionKeys.type";

// Types
type ZustandStoreJoints = {
  bears: BearSlice;
  fishes: FishSlice;
  posts: PostsSlice;
};

export type ZustandStoreState = UnionToIntersection<
  ZustandStoreJoints[keyof ZustandStoreJoints] // merge slices
>;

// Store
const usePersistedStore = create<ZustandStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createFishSlice(...a),
        ...createBearSlice(...a),
        ...createPostsSlice(...a),
      }),

      { name: "bound-store" }
    )
  )
);

const useHydratedStore = (): ZustandStoreState => {
  const [state, setState] = useState({});
  const zustandState = usePersistedStore((persistedState) => persistedState);

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state as ZustandStoreState;
};

// Store with filters by keys
export const useZustandStore = <T extends keyof ZustandStoreJoints>(
  key: T
): ZustandStoreJoints[T] => {
  const states = useHydratedStore();
  // console.log("states", key);
  return states as Pick<ZustandStoreJoints, T>[T]; // filter by key
};

// Store with SWR
type ZustandSwrProps = {
  swr: {
    data: SWRResponse<any, any>["data"];
    error: SWRResponse<any, any>["error"];
    mutate: SWRResponse<any, any>["mutate"];
    isLoading: SWRResponse<any, any>["isLoading"];
    isValidating: SWRResponse<any, any>["isValidating"];
  };
};

type ZustandSwrOptions = {
  autoStateMutate?: boolean;
  setFunction?: string;
};

export const useZustandSwr = <T extends keyof ZustandStoreJoints>(
  key: T,
  swrKey: string,
  zustandSwrOptions: ZustandSwrOptions = {
    autoStateMutate: true,
    setFunction: null,
  }
): ZustandStoreJoints[T] & ZustandSwrProps => {
  let { autoStateMutate, setFunction } = zustandSwrOptions;

  // if key is "fishes", setFunction will be "setFishes"
  setFunction = "set" + key.charAt(0).toUpperCase() + key.slice(1);

  // get the state
  const states = useHydratedStore();

  // loads SWR
  const { data, error, isLoading, isValidating, mutate } = useSwr(swrKey);

  // Whenever SWR is mutated, and autoStateMutate is true, update the state, setFunction must be defined
  useEffect(() => {
    if (autoStateMutate && states[setFunction]) {
      states[setFunction](data);
    } else if (!states[setFunction]) {
      console.error(`setFunction is not defined for key ${key}`);
    }
  }, [data]);

  return {
    ...(states as Pick<ZustandStoreJoints, T>[T]), // filter by key

    swr: {
      data,
      error,
      isLoading,
      isValidating,
      mutate,
    },
  };
};
