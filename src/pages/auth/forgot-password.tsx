import { Spacing, useTheme } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { useRouter } from "next/router";
import { ZetahexAppLogo } from "@components/ZetahexAppLogo";
import { ForgotPasswordForm } from "@components/Auth/Recovery/ForgotPasswordForm";

export default function ForgotPasswordPage(props) {
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

      <ForgotPasswordForm />
    </AuthLayout>
  );
}
