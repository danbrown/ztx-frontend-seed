export const serviceLinks = {
  admin: `${process.env.NEXT_PUBLIC_ADMIN_SERVICE}`,
  main: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}`,
  auth: {
    login: `${process.env.NEXT_PUBLIC_API_GATEWAY_AUTHORIZE_URL}/?clientId=${process.env.NEXT_PUBLIC_API_GATEWAY_CLIENT_ID}`,
    logout: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/auth/logout`,
  },

  oauth: {
    authorize: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/auth/authorize`,
  },

  privacy: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/privacy`,
  terms: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/terms`,

  dashboard: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/dashboard`,
  accountDashboard: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/dashboard/@me`,
  appDashboard: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/dashboard/[appSlug]`,
};
