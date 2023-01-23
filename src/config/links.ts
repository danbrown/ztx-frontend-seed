export const serviceLinks = {
  admin: `${process.env.NEXT_PUBLIC_ADMIN_SERVICE}`,
  main: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}`,

  privacy: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/privacy`,
  terms: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/terms`,

  dashboard: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/dashboard`,
  accountDashboard: `${process.env.NEXT_PUBLIC_MAIN_SERVICE}/dashboard/@me`,
};
