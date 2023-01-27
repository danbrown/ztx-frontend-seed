import { Container } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const AuthUserProfile = () => {
  const { authenticated, account } = useZustandStore("auth");

  return <Container>{account?.username}</Container>;
};
