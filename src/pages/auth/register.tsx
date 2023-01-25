import { Spacing, useTheme } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { useRouter } from "next/router";
import { RegisterForm } from "@components/Auth/Register/RegisterForm";
import { ZetahexAppLogo } from "@components/ZetahexAppLogo";
import { AuthUserProfile } from "@components/Auth/AuthUserProfile";

export default function RegisterPage(props) {
  const theme = useTheme();
  const router = useRouter();

  const { authenticated } = useZustandStore("auth");

  return (
    <AuthLayout
      direction={{ xs: "column", md: "row" }}
      align="center"
      justify="center"
    >
      <Spacing height={2} />
      <ZetahexAppLogo />
      <Spacing height={2} />

      {authenticated ? <AuthUserProfile /> : <RegisterForm />}
    </AuthLayout>
  );
}
