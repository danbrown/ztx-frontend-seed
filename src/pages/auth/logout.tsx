import { Loading, Spacing, Typography, useTheme } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { serviceLinks } from "@config/links";
import { ZetahexAppLogo } from "@components/ZetahexAppLogo";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogoutPage(props) {
  const theme = useTheme();
  const router = useRouter();

  const { session, account, dispatchLogout } = useZustandStore("auth");

  useEffect(() => {
    if (session || account) {
      dispatchLogout({
        sessionToken: session?.token,
        accessToken: session?.accessToken,
      })
        // user will be logged out in any way, fail or success we can proceed
        .finally(() => {
          // enqueueToast("success", {
          //   variant: "success",
          // });

          // push to login page, with the 'to' param if it exists
          router.push(
            `${serviceLinks.auth.login}${
              router?.query?.to ? `?to=${router?.query?.to}` : ""
            } `
          );
        });
    }
  }, [session]);

  return (
    <AuthLayout
      direction={{ xs: "column", md: "row" }}
      align="center"
      justify="center"
    >
      <Spacing height={4} />
      <ZetahexAppLogo />
      <Spacing height={2} />

      <Typography variant="h2" align="center">
        Wait a second...
      </Typography>
      <Spacing height={2} />
      <Typography variant="h5" align="center" color="subtext">
        You are being logged out...
      </Typography>

      <Spacing height={3} />
      <Loading type="dots" />
      <Spacing height={2} />
    </AuthLayout>
  );
}
