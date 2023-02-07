import { Avatar, Flex, Spacing, Typography, useTheme } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const AuthorizeAvatarsBox = ({ appData }) => {
  const theme = useTheme();
  const { authenticated, account } = useZustandStore("auth");

  return (
    <>
      {authenticated && account ? (
        <Flex align="center" justify="center" direction="row" p={3} pb={"0px"}>
          <Avatar
            src={appData?.logo}
            alt={appData?.name}
            title={appData?.name}
            backgroundColor="basic"
            xs="large"
            style={{ marginRight: theme.layout.spacingUnit }}
          />

          <Typography variant="h4" component="span" align="center">
            ...
          </Typography>

          <Avatar
            src={account?.avatar}
            alt={account?.name}
            title={account?.name}
            backgroundColor="basic"
            xs="large"
            style={{ marginLeft: theme.layout.spacingUnit }}
          />
        </Flex>
      ) : (
        // not authenticated, show only app logo
        <Flex align="center" justify="center" direction="row" p={3} pb={"0px"}>
          <Avatar
            src={appData?.logo}
            alt={appData?.name}
            title={appData?.name}
            backgroundColor="basic"
            xs="xlarge"
            style={{ marginRight: theme.layout.spacingUnit }}
          />
        </Flex>
      )}

      <Spacing height={2} />
    </>
  );
};
