import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { User01Icon } from "@wipsie/icons";
import { Avatar, Button, IconButton, useWidth } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const Config = () => {
  const width = useWidth();

  const { authenticated, account } = useZustandStore("auth");

  return (
    <>
      {authenticated && account ? (
        <NextLink href={`${serviceLinks.accountDashboard}`}>
          <IconButton size="small" shape="round">
            <Avatar
              xs="small"
              src={account?.avatar}
              alt={account?.name}
              title={account?.name}
              backgroundColor="basic"
            />
          </IconButton>
        </NextLink>
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
