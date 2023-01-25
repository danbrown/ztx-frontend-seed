import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { Mail01Icon } from "@wipsie/icons";
import { Button, Flex, Grid, Input, Spacing, Typography } from "@wipsie/ui";

export const ForgotPasswordForm = () => {
  return (
    <Flex fullWidth p={2} pt={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" align="left">
            Forgot Password
          </Typography>
          <Spacing height={1} />
          <Typography variant="body1" align="left" color="subtext">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sapiente
            at alias.
          </Typography>
          <Spacing height={2} />
        </Grid>

        <Grid item xs={12}>
          <Input
            fullWidth
            startAdornment={<Mail01Icon />}
            placeholder="Email Address"
          />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained">
            Send Reset Link
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Spacing height={2} />
        <Flex fullWidth align="center" justify="center" direction="column">
          <NextLink href={`${serviceLinks.auth.register}`}>
            Not a user? Create an account
          </NextLink>
          <Spacing height={1} />
          <NextLink href={`${serviceLinks.auth.login}`}>
            Already have an account? Login
          </NextLink>
        </Flex>
      </Grid>
    </Flex>
  );
};
