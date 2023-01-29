import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import apiWorker, { selfApiWorker } from "@utils/apiWorker";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

// Zustand
export const sliceName = "auth";

export const initialState: OmittedFunctionKeys<SliceType> = {
  authenticated: false,
  account: null,
  session: null,
};

export interface SliceType {
  authenticated: boolean;
  account: iAccount | null;
  session: ISession | null;

  // Login
  dispatchLogin: (params: ILoginParameters) => Promise<ISession & IError>;

  // Logout
  dispatchLogout: (params?: ILogoutParameters) => Promise<void>;

  // Register
  dispatchRegister: (
    params: IRegisterParameters
  ) => Promise<{ message: string }>;

  // Send password reset email
  dispatchPasswordReset: (email: string) => Promise<void>;

  // Validate password reset token
  dispatchPasswordTokenValidate: (token: string) => Promise<void>;

  // dispatchAuthorize: (account: any) => void;

  // dispatchSessionInit: (session: any) => void;
  dispatchSessionGetAll: () => Promise<ISession[]>;
  dispatchSessionRefresh: () => Promise<ISession & IError>;
  dispatchSessionRemove: (sessionToken: string) => Promise<void>;
  dispatchSessionRemoveAll: () => Promise<void>;
}

// Interfaces
export interface iAccount {
  id: string;
  email: string;
  name: string;
  username: string;
  permission: string;

  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
  isPublic: boolean;
  isEmailConfirmed: boolean;
  isDeleted: boolean;
  isAdminDeleted: boolean;

  profile: {
    avatar: string;
    bio: string;
    cover: string;
  };
}

export interface ISession {
  id: string;
  accountId: string;

  token: string;
  accessToken: string;
  refreshToken: string;

  device: string;
  os: string;
  browser: string;
  browserVersion: string;

  createdAt: string;
  expiresAt: string;

  account?: iAccount;
}

export interface IError {
  error?: {
    message: string;
  };
}

export interface ILoginParameters {
  identifier: string;
  password: string;
}

export interface ILogoutParameters {
  sessionToken?: string;
}

export interface IRegisterParameters {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Slice
export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set,
  get
) => ({
  authenticated: false,
  account: null,
  session: null,

  // + Handle account login
  dispatchLogin: async ({ identifier, password }) => {
    return new Promise(async (resolve, reject) => {
      // login the account
      const loginRequest = await apiWorker.post(`/auth/login`, {
        identifier,
        password,
      });

      // login failed
      if (loginRequest.data?.error) {
        return reject(loginRequest.data);
      }

      const newSession = loginRequest.data;

      // set the session cookie
      await selfApiWorker.post(`/api/auth`, {
        session: newSession,
      });

      // set the session in the store
      set((state) => ({
        authenticated: true,
        account: newSession.account,
        session: newSession,
      }));

      resolve(newSession);
    });
  },

  // + Handle user logout
  dispatchLogout: async (params) => {
    return new Promise(async (resolve, reject) => {
      const { sessionToken = null } = params || {};

      // get the current session from cookie
      const currentSessionRequest = await selfApiWorker.post(
        `/api/auth/session`
      );
      const currentSession = currentSessionRequest.data;

      // delete session from the server
      try {
        if (sessionToken) {
          await apiWorker.delete(`/auth/sessions/${sessionToken}`);
        } else if (currentSession) {
          await apiWorker.delete(
            `/auth/sessions/accessToken/${currentSession?.token}`
          );
        }
      } catch (e) {
        console.log(e);
        console.log("Unable to delete session from the server");
      }

      // remove session cookie
      await selfApiWorker.post(`/api/auth/logout`);

      // remove session from the store
      set((state) => ({
        authenticated: false,
        account: null,
        session: null,
      }));

      resolve();
    });
  },

  // TODO + Handle user registration
  dispatchRegister: async ({
    confirmPassword,
    email,
    name,
    password,
    username,
  }) => {
    return new Promise(async (resolve, reject) => {
      // check if passwords match
      if (password !== confirmPassword) {
        return reject({ error: { message: "Passwords do not match" } });
      }

      // register the account
      const result = await apiWorker.post(`/auth/register`, {
        username,
        name,
        email,
        password,
      });

      if (result.data?.error) {
        return reject(result.data);
      }

      resolve({ message: "Registration successful" });
    });
  },

  // TODO + Handle password reset
  dispatchPasswordReset: async (email) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  // TODO + Handle password reset token validation
  dispatchPasswordTokenValidate: async (token) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  // + Handle get all sessions
  dispatchSessionGetAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const sessionsRequest = await apiWorker.get(`/auth/sessions`);
        const sessions = sessionsRequest.data;

        resolve(sessions);
      } catch (e) {
        console.log("Unable to get sessions");
        console.log(e);

        reject();
      }
    });
  },

  // + Handle session refresh
  dispatchSessionRefresh: async () => {
    return new Promise(async (resolve, reject) => {
      // get the current session from cookie
      const currentSessionRequest = await selfApiWorker.post(
        `/api/auth/session`
      );
      const currentSession = currentSessionRequest.data;

      // refresh the session
      try {
        const refreshedSessionRequest = await apiWorker.post(
          `/auth/sessions/refresh`,
          {
            token: currentSession.token,
            refreshToken: currentSession.refreshToken,
          }
        );

        const refreshedSession = refreshedSessionRequest.data;

        if (refreshedSession.error) {
          console.log("Unable to refresh session");
          console.log(refreshedSession.error);
          return reject(refreshedSession);
        }

        // set the session cookie with the new session
        await selfApiWorker.post(`/api/auth`, {
          session: refreshedSession,
        });

        // set the session in the store
        set((state) => ({
          authenticated: true,
          account: refreshedSession.account,
          session: refreshedSession,
        }));

        resolve(refreshedSession);
      } catch (e) {
        console.log("Unable to refresh session");
        console.log(e);
        return reject({ error: { message: "Unable to refresh session" } });
      }
    });
  },

  // + Handle remove session
  dispatchSessionRemove: async (sessionToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        await apiWorker.delete(`/auth/sessions/${sessionToken}`);
        console.log("Removed session");

        // logout the user
        await get().dispatchLogout();

        resolve();
      } catch (e) {
        console.log("Unable to remove session");
        console.log(e);

        // logout the user
        await get().dispatchLogout();

        reject();
      }
    });
  },

  // + Handle remove all sessions
  dispatchSessionRemoveAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await apiWorker.delete(`/auth/sessions`);
        console.log("Removed all sessions");

        // logout the user
        await get().dispatchLogout();

        resolve();
      } catch (e) {
        console.log("Unable to remove all sessions");
        console.log(e);

        // logout the user
        await get().dispatchLogout();

        reject();
      }
    });
  },
});
