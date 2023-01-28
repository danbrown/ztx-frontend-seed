import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { User01Icon } from "@wipsie/icons";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Popover,
  Spacing,
  useWidth,
} from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useState } from "react";
import { LogoutButton } from "./LogoutButton";

export const Config = () => {
  const width = useWidth();

  const { authenticated, account } = useZustandStore("auth");

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  return (
    <>
      {authenticated && account ? (
        <Popover
          arrow
          visible={isPopoverVisible}
          position="bottom right"
          backgroundColor="highlight"
          backdrop
          onBackdropClick={() => setIsPopoverVisible(false)}
          backdropProps={{
            noPortal: true,
          }}
          content={
            <Container backgroundColor="highlight" p={1}>
              <NextLink href={`${serviceLinks.accountDashboard}`}>
                Dashboard
              </NextLink>
              <Spacing height={2} />
              <LogoutButton />
            </Container>
          }
        >
          <IconButton
            size="small"
            shape="round"
            onClick={() => setIsPopoverVisible(!isPopoverVisible)}
          >
            <Avatar
              xs="small"
              src={account?.profile?.avatar}
              alt={account?.name}
              title={account?.name}
              backgroundColor="basic"
            />
          </IconButton>
        </Popover>
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
