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

  // dispatchSessionInit: (session: any) => void;
  dispatchSessionRefresh: () => Promise<ISession & IError>;
  // dispatchAuthorize: (account: any) => void;
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
  accessToken?: string;
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
  dispatchLogout: async ({ sessionToken = null, accessToken = null }) => {
    return new Promise(async (resolve, reject) => {
      const currentSession = get().session;

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

  // + Handle user registration
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

  // + Handle password reset
  dispatchPasswordReset: async (email) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  // + Handle password reset token validation
  dispatchPasswordTokenValidate: async (token) => {
    return new Promise((resolve, reject) => {
      resolve();
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

      // TODO: implement session refresh logic here
      const newSession: ISession = currentSession;
      // ----

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
});
