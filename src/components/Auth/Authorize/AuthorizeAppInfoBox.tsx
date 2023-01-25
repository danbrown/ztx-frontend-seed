import { Flex, responsive, Spacing, Typography } from "@wipsie/ui";
import { ClockCheckIcon, Link01Icon, User01Icon } from "@wipsie/icons";

export const AuthorizeAppInfoBox = ({
  authenticated,
  loggedSession,
  appData,
}) => {
  if (!authenticated || !loggedSession?.user) return null;

  return (
    <>
      <Spacing height={1} />

      <Flex
        fullWidth
        p={2}
        pb={1}
        pt={1}
        align="center"
        justify="start"
        direction="row"
        wrap="nowrap"
      >
        <Typography variant="h5" component="span" color="subtext">
          <Link01Icon />
        </Typography>
        <Spacing width={1} />
        <Typography
          variant="body1"
          color="subtext"
          style={{ fontSize: responsive(10, 12) }}
        >
          Once you grant access, will be redirected to the app, at{" "}
          {appData?.redirectUri}
        </Typography>
      </Flex>
      <Flex
        fullWidth
        p={2}
        pb={1}
        pt={1}
        align="center"
        justify="start"
        direction="row"
        wrap="nowrap"
      >
        <Typography variant="h5" component="span" color="subtext">
          <User01Icon />
        </Typography>
        <Spacing width={1} />
        <Typography
          variant="body1"
          color="subtext"
          style={{ fontSize: responsive(10, 12) }}
        >
          You can revoke it at any time from your account settings.
        </Typography>
      </Flex>
      <Flex
        fullWidth
        p={2}
        pb={1}
        pt={1}
        align="center"
        justify="start"
        direction="row"
        wrap="nowrap"
      >
        <Typography variant="h5" component="span" color="subtext">
          <ClockCheckIcon />
        </Typography>
        <Spacing width={1} />
        <Typography
          variant="body1"
          color="subtext"
          style={{ fontSize: responsive(10, 12) }}
        >
          Active since{" "}
          {
            new Date(appData?.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }) /* DD Mon YYY */
          }
        </Typography>
      </Flex>
    </>
  );
};
