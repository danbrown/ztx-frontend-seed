import { OmittedFunctionKeys } from "@customTypes/OmittedFunctionKeys.type";
import { ZustandStoreState } from "@zustand/ZustandStoreProvider";
import { StateCreator } from "zustand";
import { selfApiWorker, apiWorker } from "@utils/apiWorker";
import { decodeJwt } from "@utils/decodeJwt";

// Zustand
export const sliceName = "auth";

export const initialState: OmittedFunctionKeys<SliceType> = {
  authenticated: false,
  account: null,
  session: null,
};

// Interfaces
export interface IAccount {
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

  createdAt: string;
  updatedAt: string;
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

  account?: IAccount; // account has session data
}

export interface IError {
  error?: {
    message: string;
  };
}

export interface ILoginParameters {
  identifier: string;
  password: string;
  userAgent?: string;
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

export interface IEditAccountParameters {
  name: string;
  profile: {
    avatar: string;
    bio: string;
    cover: string;
  };
}

// Slice
export interface SliceType {
  authenticated: boolean;
  account: IAccount | null;
  session: ISession | null;

  // @ AUTHENTICATION
  dispatchLogin: (params: ILoginParameters) => Promise<ISession & IError>;
  dispatchLogout: (params?: ILogoutParameters) => Promise<void>;
  dispatchRegister: (
    params: IRegisterParameters
  ) => Promise<{ message: string }>;
  dispatchPasswordReset: (email: string) => Promise<void>;
  dispatchPasswordTokenValidate: (token: string) => Promise<void>;

  // dispatchAuthorize: (account: any) => void;

  // @ SESSIONS
  dispatchSessionInit: () => Promise<ISession | null>;
  dispatchSessionGetAll: () => Promise<ISession[]>;
  dispatchSessionRefresh: (
    currentSession: ISession
  ) => Promise<ISession & IError>;
  dispatchSessionRemove: (sessionToken: string) => Promise<void>;
  dispatchSessionRemoveAll: () => Promise<void>;

  // @ ACCOUNTS
  // dispatchAccountGet: (accountId: string) => Promise<iAccount>;
  // dispatchAccountGetAll: () => Promise<iAccount[]>;
  dispatchAccountUpdate: (
    accountId: string,
    accountData: IEditAccountParameters
  ) => Promise<IAccount>;
}

export const createSlice: StateCreator<ZustandStoreState, [], [], SliceType> = (
  set,
  get
) => ({
  authenticated: false,
  account: null,
  session: null,

  // @ AUTHENTICATION
  // + Handle account login
  dispatchLogin: async ({ identifier, password, userAgent }) => {
    return new Promise(async (resolve, reject) => {
      // login the account
      const newSession = await apiWorker("POST", `/auth/login`, {
        identifier,
        password,
        userAgent,
      }).then((res) => res.json());

      // login failed
      if (newSession?.error) {
        return reject(newSession);
      }

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
          await apiWorker("DELETE", `/auth/sessions/${sessionToken}`);
        } else if (!currentSession?.error) {
          await apiWorker("DELETE", `/auth/sessions/${currentSession?.token}`);
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
      const result = await apiWorker("POST", `/auth/register`, {
        username,
        name,
        email,
        password,
      }).then((res) => res.json());

      if (result?.error) {
        return reject(result);
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

  // @ SESSIONS

  // + Handle session init
  dispatchSessionInit: async () => {
    return new Promise(async (resolve, reject) => {
      // get the current session from cookie
      const currentSessionRequest = await selfApiWorker.post(
        `/api/auth/session`
      );
      const currentSession: ISession & IError = currentSessionRequest.data;

      // check if there is an error
      if (currentSession.error) {
        return reject(currentSession.error);
      }

      // console.log(currentSession);

      // if there is no session, return null
      if (!currentSession) {
        return resolve(null);
      }

      // has a session, validate it
      try {
        const sessionValidate: ISession & IError = await apiWorker(
          "POST",
          `/auth/sessions/validate`,
          {
            token: currentSession.token,
          }
        ).then((res) => res.json());

        // check if there is an error
        if (sessionValidate.error) {
          return reject(sessionValidate.error);
        }

        // get current account
        const account: IAccount & IError = await apiWorker(
          "GET",
          `/auth/accounts/@me`
        ).then((res) => res.json());

        // check if there is an error
        if (account.error) {
          return reject(account.error);
        }

        // set the session in the store
        set((state) => ({
          authenticated: true,
          account,
          session: currentSession,
        }));

        resolve(currentSession);
      } catch (e) {
        console.log(e);

        set((state) => ({
          authenticated: false,
          account: null,
          session: null,
        }));

        resolve(null);
      }
    });
  },

  // + Handle get all sessions
  dispatchSessionGetAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const sessions = await apiWorker("GET", `/auth/sessions`).then((res) =>
          res.json()
        );

        resolve(sessions);
      } catch (e) {
        console.log("Unable to get sessions");
        console.log(e);

        reject();
      }
    });
  },

  // + Handle session refresh
  dispatchSessionRefresh: async (currentSession: ISession & IError) => {
    return new Promise(async (resolve, reject) => {
      const DEBUG = false;

      if (!currentSession) {
        return reject({ error: { message: "Unable to refresh session" } });
      }

      // check if there is an error
      if (currentSession.error) {
        // session is not there, so we can't refresh it
        DEBUG &&
          alert("Unable get session" + JSON.stringify(currentSession.error));
        return reject({ error: { message: "Unable to refresh session" } });
      }

      // check if the session is expired
      const { exp: tokenExpDate } = decodeJwt(currentSession.accessToken);

      // consider the refresh token expired it's 5 minutes before the actual expiration date
      const tokenExpDateWithRefresh = tokenExpDate - 300; // 300 is 5 minutes in seconds
      const currentDate = new Date().getTime() / 1000;

      // if the token is expired, refresh it, refreshedSession will be already updated in the store, so we can get the new token from there
      if (currentDate > tokenExpDateWithRefresh) {
        // & REFRESH THE TOKEN
        try {
          DEBUG && alert("Token expired, refreshing session...");

          const refreshedSession = await apiWorker(
            "POST",
            `/auth/sessions/refresh`,
            {
              token: currentSession.token,
              refreshToken: currentSession.refreshToken,
            }
          ).then((res) => res.json());

          DEBUG &&
            alert("Session refreshed" + JSON.stringify(refreshedSession));

          if (refreshedSession.error) {
            DEBUG &&
              alert(
                "Unable to refresh session" + JSON.stringify(refreshedSession)
              );

            return reject(refreshedSession);
          }

          // set the session cookie with the new session
          await selfApiWorker
            .post(`/api/auth`, {
              session: refreshedSession,
            })
            .then((res) => {
              DEBUG && alert("Session cookie set");
            });

          // set the session in the store
          set((state) => ({
            authenticated: true,
            session: refreshedSession,
          }));

          return resolve(refreshedSession);
        } catch (e) {
          DEBUG && alert("Unable to refresh session" + JSON.stringify(e));
          return reject({ error: { message: "Unable to refresh session" } });
        }
      } else {
        // token is not expired, so we can just return the current session

        DEBUG &&
          alert(
            "Session is not expired, there is still " +
              ((tokenExpDateWithRefresh - currentDate) / 60).toFixed(2) +
              " minutes left"
          );

        // set the session in the store, no need to set the cookie, it's already there
        set((state) => ({
          authenticated: true,
          session: currentSession,
        }));

        return resolve(currentSession);
      }
    });
  },

  // + Handle remove session
  dispatchSessionRemove: async (sessionToken) => {
    return new Promise(async (resolve, reject) => {
      const currentSessionRequest = await selfApiWorker.post(
        `/api/auth/session`
      );
      const currentSession: ISession & IError = currentSessionRequest.data;

      if (currentSession.error) {
        // session is not there, so we can't refresh it
        return reject({ error: { message: "Unable to remove session" } });
      }

      try {
        // check if the removed session is the current session, if it is, logout the user
        if (currentSession.token === sessionToken) {
          await get().dispatchLogout(); // logout already removes the session from the server and the cookie
        }
        // else just remove the session from the server
        else {
          await apiWorker("DELETE", `/auth/sessions/${sessionToken}`);
          console.log("Removed session");
        }

        resolve();
      } catch (e) {
        console.log("Unable to remove session");
        console.log(e);

        // check if the removed session is the current session, if it is, logout the user
        if (currentSession.token === sessionToken) {
          await get().dispatchLogout();
          await selfApiWorker.post(`/api/auth/logout`);
        }

        reject();
      }
    });
  },

  // + Handle remove all sessions
  dispatchSessionRemoveAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await apiWorker("DELETE", `/auth/sessions`);
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

  // @ ACCOUNT
  // + Handle account update
  dispatchAccountUpdate: async (accountId: string, accountData: IAccount) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedAccount = await apiWorker(
          "PUT",
          `/auth/accounts/${accountId}`,
          accountData
        ).then((res) => res.json());

        // TODO: handle errors

        // update the account in the store
        set((state) => ({
          account: updatedAccount,
          session: {
            ...state.session,
            account: updatedAccount,
          },
        }));

        resolve(updatedAccount);
      } catch (e) {
        console.log("Unable to update account");
        console.log(e);

        reject();
      }
    });
  },
});
