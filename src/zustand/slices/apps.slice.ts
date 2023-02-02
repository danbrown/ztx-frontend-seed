import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";
import apiWorker, { selfApiWorker } from "@utils/apiWorker";

// Zustand
export const sliceName = "apps";

export const initialState: OmittedFunctionKeys<SliceType> = {
  currentApp: null,
};

// Interfaces

export interface IApp {
  id: string;
  name: string;
  slug: string;

  description: string;
  avatar: string;
  homepageUrl: string;

  isBanned: boolean;
  isDeleted: boolean;
  isAdminDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IAppCreateParams {
  name: string;
  slug: string;

  description?: string;
  avatar?: string;
  homepageUrl?: string;
}

export interface IAppUpdateParams {
  name?: string;
  slug?: string;

  description?: string;
  avatar?: string;
  homepageUrl?: string;
}

export interface IAppCredential {}

export interface IAppCredentialCreateParams {}

export interface IAppCredentialUpdateParams {}

// Slice
export interface SliceType {
  currentApp: IApp;

  dispatchGetAvailableScopes: () => Promise<string[]>;

  // apps
  dispatchAppsGetPublic: (appId: string) => Promise<IApp>;
  dispatchAppsGetCurrent: (appId: string) => Promise<IApp>;
  dispatchAppsGetAll: () => Promise<IApp[]>;
  dispatchAppsGetSingle: (appId: string) => Promise<IApp>;
  dispatchAppsCreate: (createAppParams: IAppCreateParams) => Promise<IApp>;
  dispatchAppsUpdate: (
    appId: string,
    updateAppParams: IAppUpdateParams
  ) => Promise<IApp>;
  dispatchAppsDelete: (appId: string) => Promise<IApp>;

  // // credentials
  // dispatchGetAppCredentials: (appId: string) => Promise<IAppCredential[]>;
  // dispatchGetAppCredential: (
  //   appId: string,
  //   credentialId: string
  // ) => Promise<IAppCredential>;
  // dispatchGetAppCredentialSecret: (
  //   appId: string,
  //   credentialId: string
  // ) => Promise<IAppCredential>;
  // dispatchAppsCreateCredential: (
  //   appId: string,
  //   createAppCredentialParams: IAppCredentialCreateParams
  // ) => Promise<IAppCredential>;
  // dispatchAppsUpdateCredential: (
  //   appId: string,
  //   credentialId: string,
  //   updateAppCredentialParams: IAppCredentialUpdateParams
  // ) => Promise<IAppCredential>;
  // dispatchAppsDeleteCredential: (
  //   appId: string,
  //   credentialId: string
  // ) => Promise<IAppCredential>;
}

export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set
) => ({
  currentApp: null,

  dispatchGetAvailableScopes: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiWorker.get("/apps/scopes");
        resolve(data as string[]);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  // apps
  dispatchAppsGetPublic: async (appId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await selfApiWorker.get(`/apps/public/${appId}`);
        resolve(data as IApp);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsGetAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiWorker.get("/apps");
        resolve(data as IApp[]);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsGetSingle: async (appId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await selfApiWorker.get(`/apps/${appId}`);
        resolve(data as IApp);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsGetCurrent: async (appId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiWorker.get(`/apps/${appId}`);

        set({ currentApp: data as IApp });

        resolve(data as IApp);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsCreate: async ({
    name,
    slug,
    description,
    avatar,
    homepageUrl,
  }: IAppCreateParams) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiWorker.post("/apps", {
          name,
          slug,
          description,
          avatar,
          homepageUrl,
        });
        resolve(data as IApp);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsUpdate: async (
    appId: string,
    { name, slug, description, avatar, homepageUrl }: IAppUpdateParams
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiWorker.put(`/apps/${appId}`, {
          name,
          slug,
          description,
          avatar,
          homepageUrl,
        });
        resolve(data as IApp);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsDelete: async (appId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiWorker.delete(`/apps/${appId}`);
        resolve(data as IApp);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
});
