import { create } from "zustand";
import { useEffect, useState } from "react";
import { devtools, persist } from "zustand/middleware";
import useSwr, { SWRResponse } from "swr";
import { UnionToIntersection } from "@customTypes/UnionToIntersection.type";
import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";

// Slices
import {
  sliceName as sliceName_Posts,
  SliceType as SliceType_Posts,
  initialState as initialState_Posts,
  createSlice as createSlice_Posts,
} from "./slices/posts.slice";
import {
  sliceName as sliceName_Settings,
  SliceType as SliceType_Settings,
  initialState as initialState_Settings,
  createSlice as createSlice_Settings,
} from "./slices/settings.slice";
import {
  sliceName as sliceName_Auth,
  SliceType as SliceType_Auth,
  initialState as initialState_Auth,
  createSlice as createSlice_Auth,
} from "./slices/auth.slice";

// & Scoped Types - Joint all slices into one type, scoped
type ZustandStoreJoints = {
  [sliceName_Posts]: SliceType_Posts;
  [sliceName_Settings]: SliceType_Settings;
  [sliceName_Auth]: SliceType_Auth;
};

// Here we add the loading property to each slice, loading is universal to the slices
type ZustandStoreSlicesJoints = {
  [key in keyof ZustandStoreJoints]: ZustandStoreJoints[key extends keyof ZustandStoreJoints
    ? key
    : never] & { loading: boolean };
};

// Merge all slices into one intersection type
export type ZustandStoreState = UnionToIntersection<
  ZustandStoreSlicesJoints[keyof ZustandStoreSlicesJoints] // merge slices
>;

type ZustandStoreInitialState = OmittedFunctionKeys<ZustandStoreState>;

// & Initial State
const initialState: ZustandStoreInitialState = {
  loading: null,
  ...initialState_Posts,
  ...initialState_Settings,
  ...initialState_Auth,
};

// & Store
export const zustandStore = create<ZustandStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...initialState,

        ...createSlice_Posts(...a),
        ...createSlice_Settings(...a),
        ...createSlice_Auth(...a),
      }),

      {
        name: "zustand-store",
      }
    )
  )
);

const useHydratedStore = (): ZustandStoreState => {
  const [state, setState] = useState({
    ...initialState,
    ...zustandStore.getState(),
  });
  const zustandState = zustandStore((state) => state);

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state as ZustandStoreState;
};

// Store with filters by keys
export const useZustandStore = <T extends keyof ZustandStoreSlicesJoints>(
  key: T
): ZustandStoreSlicesJoints[T] => {
  const states = useHydratedStore();
  // console.log("states", key);
  return states as Pick<ZustandStoreSlicesJoints, T>[typeof key]; // filter by key
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

export const useZustandSwr = <T extends keyof ZustandStoreSlicesJoints>(
  key: T,
  swrKey: string,
  zustandSwrOptions: ZustandSwrOptions = {
    autoStateMutate: true,
    setFunction: null,
  }
): ZustandStoreSlicesJoints[T] & ZustandSwrProps => {
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
    ...(states as Pick<ZustandStoreSlicesJoints, T>[T]), // filter by key

    swr: {
      data,
      error,
      isLoading,
      isValidating,
      mutate,
    },
  };
};
