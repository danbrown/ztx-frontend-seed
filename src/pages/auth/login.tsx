import { Spacing, useTheme } from "@wipsie/ui";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { LoginForm } from "@components/Auth/Login/LoginForm";
import { ZetahexAppLogo } from "@components/ZetahexAppLogo";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { AuthUserProfile } from "@components/Auth/AuthUserProfile";

export default function LoginPage(props) {
  const theme = useTheme();
  const { session, user, authenticated } = useZustandStore("auth");

  return (
    <AuthLayout
      direction={{ xs: "column", md: "row" }}
      align="center"
      justify="center"
    >
      <Spacing height={2} />
      <ZetahexAppLogo />
      <Spacing height={2} />

      {authenticated ? <AuthUserProfile /> : <LoginForm />}
    </AuthLayout>
  );
}
