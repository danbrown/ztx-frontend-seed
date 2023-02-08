import { Spacing, useTheme } from "@wipsie/ui";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { LoginForm } from "@components/Auth/Login/LoginForm";
import { AppLogo } from "@components/AppLogo";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { AuthUserProfile } from "@components/Auth/AuthUserProfile";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { serviceLinks } from "@config/links";

export default function LoginPage(props) {
  const router = useRouter();
  const theme = useTheme();
  const { authenticated } = useZustandStore("auth");

  // useEffect(() => {
  //   if (authenticated) {
  //     router.push(
  //       (router?.query?.to as string)
  //         ? (router?.query?.to as string)
  //         : serviceLinks.main
  //     );
  //   }
  // }, [authenticated]);

  return (
    <AuthLayout
      direction={{ xs: "column", md: "row" }}
      align="center"
      justify="center"
    >
      <Spacing height={2} />
      <AppLogo />
      <Spacing height={2} />

      {authenticated ? <AuthUserProfile /> : <LoginForm />}
    </AuthLayout>
  );
}
