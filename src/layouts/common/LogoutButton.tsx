import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { useWindow } from "@hooks/useWindow";
import { Button } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useRouter } from "next/router";

export const LogoutButton = () => {
  const router = useRouter();
  const window = useWindow();

  const { authenticated } = useZustandStore("auth");

  if (!authenticated) return null;

  return (
    <NextLink href={`${serviceLinks.auth.logout}?to=${window?.location?.href}`}>
      <Button variant="outlined" backgroundColor="danger">
        Logout
      </Button>
    </NextLink>
  );
};
