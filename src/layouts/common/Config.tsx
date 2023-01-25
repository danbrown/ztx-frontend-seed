import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { User01Icon } from "@wipsie/icons";
import { Avatar, Button, IconButton, useWidth } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const Config = () => {
  const width = useWidth();

  const { authenticated, user } = useZustandStore("auth");

  return (
    <>
      {authenticated && user ? (
        <IconButton size="small" shape="round">
          <Avatar
            xs="small"
            src={user?.avatar}
            alt={user?.name}
            title={user?.name}
            backgroundColor="basic"
          />
        </IconButton>
      ) : (
        <NextLink href={`${serviceLinks.auth.login}`}>
          <Button
            variant="ghost"
            size="small"
            startIcon={<User01Icon />}
            shape="square"
          >
            Sign In
          </Button>
        </NextLink>
      )}
    </>
  );
};
