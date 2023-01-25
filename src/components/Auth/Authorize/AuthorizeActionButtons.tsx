import { Button, Flex, Grid } from "@wipsie/ui";

export const AuthorizeActionButtons = ({
  authenticated,
  loggedSession,
  appData,
}) => {
  if (!authenticated || !loggedSession?.user) return null;

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
