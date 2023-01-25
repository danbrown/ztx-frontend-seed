import { Container } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const AuthUserProfile = () => {
  const { authenticated, user } = useZustandStore("auth");

  return <Container>{user?.username}</Container>;
};
