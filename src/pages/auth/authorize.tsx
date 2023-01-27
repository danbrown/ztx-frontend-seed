import { useTheme } from "@wipsie/ui";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { LoginForm } from "@components/Auth/Login/LoginForm";
import { AuthorizeActionButtons } from "@components/Auth/Authorize/AuthorizeActionButtons";
import { AuthorizeAppInfoBox } from "@components/Auth/Authorize/AuthorizeAppInfoBox";
import { AuthorizeScopesBox } from "@components/Auth/Authorize/AuthorizeScopesBox";
import { AuthorizeAvatarsBox } from "@components/Auth/Authorize/AuthorizeAvatarsBox";
import { AuthorizeContextText } from "@components/Auth/Authorize/AuthorizeContextText";
import { AuthorizeUserSignedIn } from "@components/Auth/Authorize/AuthorizeUserSignedIn";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export default function AuthorizePage(props) {
  const theme = useTheme();
  const { authenticated, session } = useZustandStore("auth");

  const appData = {
    name: "Neobeasts",
    description: "A creepy social network for all creatures",
    logo: "https://files.library.wipsie.com/project_avatars/31ff7363-167b-4fad-939b-0fab80b52dc6_neobeasts.jpg",
    scope: ["identity", "email"],
    redirectUri: "https://neobeasts.com/auth/callback",
    createdAt: "2021-08-01T00:00:00.000Z",
    ownerSource: "THIRD_PARTY",
  };

  return (
    <AuthLayout
      direction={{ xs: "column", md: "row" }}
      align="center"
      justify="center"
    >
      {/* Avatars box */}
      <AuthorizeAvatarsBox appData={appData} />

      {/* Source oriented text */}
      <AuthorizeContextText appData={appData} />

      {/* Signed in */}
      <AuthorizeUserSignedIn appData={appData} />

      {/* Scopes box */}
      <AuthorizeScopesBox appData={appData} />

      {/* App Information Box */}
      <AuthorizeAppInfoBox appData={appData} />

      {/* Action Buttons */}
      <AuthorizeActionButtons appData={appData} />

      {/* Not signed in - Login Form */}
      {(!authenticated || !session) && <LoginForm />}
    </AuthLayout>
  );
}
