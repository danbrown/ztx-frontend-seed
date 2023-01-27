import { Button, Flex, Grid } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const AuthorizeActionButtons = ({ appData }) => {
  const { authenticated, account } = useZustandStore("auth");

  if (!authenticated || !account) return null;

  return (
    <Flex fullWidth p={2} pt={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="outlined">
            Deny
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="contained">
            Authorize
          </Button>
        </Grid>
      </Grid>
    </Flex>
  );
};
