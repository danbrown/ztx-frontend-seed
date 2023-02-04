import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";
import { apiWorker, selfApiWorker } from "@utils/apiWorker";

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

export interface IAppCredential {
  id: string;
  tenantAppId: string;

  name: string;
  redirectUri: string;
  scopes: string[];

  clientId: string;
  clientSecret?: string;

  createdAt: string;
}

export interface IAppCredentialCreateParams {
  name: string;
  redirectUri: string;
  scopes: string[];
}

export interface IAppCredentialUpdateParams {
  name?: string;
  redirectUri?: string;
  scopes?: string[];
}

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

  // credentials
  dispatchAppCredentialsGetAll: (appId: string) => Promise<IAppCredential[]>;
  dispatchAppCredentialsGetSingle: (
    appId: string,
    credentialId: string
  ) => Promise<IAppCredential>;
  dispatchAppCredentialsGetSecret: (
    appId: string,
    credentialId: string
  ) => Promise<IAppCredential>;
  dispatchAppCredentialsCreate: (
    appId: string,
    createAppCredentialParams: IAppCredentialCreateParams
  ) => Promise<IAppCredential>;
  dispatchAppCredentialsUpdate: (
    appId: string,
    credentialId: string,
    updateAppCredentialParams: IAppCredentialUpdateParams
  ) => Promise<IAppCredential>;
  dispatchAppCredentialsDelete: (
    appId: string,
    credentialId: string
  ) => Promise<IAppCredential>;
}

export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set
) => ({
  currentApp: null,

  dispatchGetAvailableScopes: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: string[] = await apiWorker("GET", "/apps/scopes").then(
          (res) => res.json()
        );

        resolve(data);
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
        const data: IApp = await apiWorker("GET", `/apps/public/${appId}`).then(
          (res) => res.json()
        );

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsGetAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IApp[] = await apiWorker("GET", "/apps").then((res) =>
          res.json()
        );

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsGetSingle: async (appId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IApp = await apiWorker("GET", `/apps/${appId}`).then(
          (res) => res.json()
        );

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsGetCurrent: async (appSlug: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IApp = await apiWorker("GET", `/apps/${appSlug}`).then(
          (res) => res.json()
        );

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
        const data: IApp = await apiWorker("POST", "/apps", {
          name,
          slug,
          description,
          avatar,
          homepageUrl,
        }).then((res) => res.json());

        resolve(data);
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
        const data: IApp = await apiWorker("PUT", `/apps/${appId}`, {
          name,
          slug,
          description,
          avatar,
          homepageUrl,
        }).then((res) => res.json());

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppsDelete: async (appId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IApp = await apiWorker("DELETE", `/apps/${appId}`).then(
          (res) => res.json()
        );

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  // @ CREDENTIALS
  dispatchAppCredentialsGetAll: async (appId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IAppCredential[] = await apiWorker(
          "GET",
          `/apps/${appId}/credentials`
        ).then((res) => res.json());

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppCredentialsGetSingle: async (
    appId: string,
    credentialId: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IAppCredential = await apiWorker(
          "GET",
          `/apps/${appId}/credentials/${credentialId}`
        ).then((res) => res.json());

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppCredentialsGetSecret: async (
    appId: string,
    credentialId: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IAppCredential = await apiWorker(
          "GET",
          `/apps/${appId}/credentials/${credentialId}/secret`
        ).then((res) => res.json());

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppCredentialsCreate: async (
    appId: string,
    { name, redirectUri, scopes }: IAppCredentialCreateParams
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IAppCredential = await apiWorker(
          "POST",
          `/apps/${appId}/credentials`,
          {
            name,
            redirectUri,
            scopes,
          }
        ).then((res) => res.json());

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppCredentialsUpdate: async (
    appId: string,
    credentialId: string,
    { name, redirectUri, scopes }: IAppCredentialUpdateParams
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IAppCredential = await apiWorker(
          "PUT",
          `/apps/${appId}/credentials/${credentialId}`,
          {
            name,
            redirectUri,
            scopes,
          }
        ).then((res) => res.json());

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  dispatchAppCredentialsDelete: async (appId: string, credentialId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IAppCredential = await apiWorker(
          "DELETE",
          `/apps/${appId}/credentials/${credentialId}`
        ).then((res) => res.json());

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
});
