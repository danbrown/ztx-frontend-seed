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
import { useRouter } from "next/router";

export default function AuthorizePage(props) {
  const theme = useTheme();
  const router = useRouter();
  const { authenticated, session } = useZustandStore("auth");

  const mockAppData = {
    name: "Neobeasts",
    description: "A creepy social network for all creatures",
    logo: "https://files.library.wipsie.com/project_avatars/31ff7363-167b-4fad-939b-0fab80b52dc6_neobeasts.jpg",
    scope: ["identity", "email"],
    redirectUri: "https://neobeasts.com/auth/callback",
    createdAt: "2021-08-01T00:00:00.000Z",
    ownerSource: "THIRD_PARTY",
  };

  const { client_id } = router.query;

  return (
    <AuthLayout
      direction={{ xs: "column", md: "row" }}
      align="center"
      justify="center"
    >
      {/* Avatars box */}
      <AuthorizeAvatarsBox appData={mockAppData} />

      {/* Source oriented text */}
      <AuthorizeContextText appData={mockAppData} />

      {/* Signed in */}
      <AuthorizeUserSignedIn appData={mockAppData} />

      {/* Scopes box */}
      <AuthorizeScopesBox appData={mockAppData} />

      {/* App Information Box */}
      <AuthorizeAppInfoBox appData={mockAppData} />

      {/* Action Buttons */}
      <AuthorizeActionButtons appData={mockAppData} />

      {/* Not signed in - Login Form */}
      {(!authenticated || !session) && <LoginForm />}
    </AuthLayout>
  );
}
