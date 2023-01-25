import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";

// Zustand
export const sliceName = "auth";

export const initialState: OmittedFunctionKeys<SliceType> = {
  authenticated: false,
  user: null,
  session: null,
};

export interface SliceType {
  authenticated: boolean;
  user: iUser | null;
  session: ISession | null;

  // Login
  dispatchLogin: (params: ILoginParameters) => Promise<ISession | IError>;

  // Logout
  dispatchLogout: (params: ILogoutParameters | undefined) => Promise<void>;

  // Register
  dispatchRegister: (
    params: IRegisterParameters
  ) => Promise<{ message: string }>;

  // Send password reset email
  dispatchPasswordReset: (email: string) => Promise<void>;

  // Validate password reset token
  dispatchPasswordTokenValidate: (token: string) => Promise<void>;

  // dispatchSessionInit: (session: any) => void;
  // dispatchSessionRefresh: (session: any) => void;
  // dispatchAuthorize: (user: any) => void;
}

// Interfaces
export interface iUser {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
}

export interface ISession {
  id: string;
  user?: iUser;
  expiresAt: string;
  token: string;
  refreshToken: string;
  accessToken: string;
}

export interface IError {
  message: string;
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
  user: null,
  session: null,

  // + Handle user login
  dispatchLogin: async ({ identifier, password }) => {
    return new Promise((resolve, reject) => {
      const newSession: ISession = {
        id: "1",
        expiresAt: "2021-08-01T00:00:00.000Z",
        accessToken: "bababoueye",
        refreshToken: "bababoueye",
        token: "bababoueye",

        user: {
          id: "1",
          name: "Daniel Brown",
          username: "danbrown",
          email: "danbrown@example.com",
          avatar:
            "https://files.library.wipsie.com/user_avatars/abd9a22c-f9f8-41fd-8c46-3db804791477_danbrown.jpg",
        },
      };

      set((state) => ({
        authenticated: true,
        user: newSession.user,
        session: newSession,
      }));

      resolve(newSession);
    });
  },

  // + Handle user logout
  dispatchLogout: async ({ sessionToken = null, accessToken = null }) => {
    return new Promise((resolve, reject) => {
      const currentSession = get().session;

      set((state) => ({
        authenticated: false,
        user: null,
        session: null,
      }));

      resolve();
    });
  },

  // + Handle user registration
  dispatchRegister: async ({ username }) => {
    return new Promise((resolve, reject) => {
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
});
