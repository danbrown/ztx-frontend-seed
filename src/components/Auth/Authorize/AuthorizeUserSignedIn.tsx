import { responsive, Spacing, Typography } from "@wipsie/ui";
import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { useRouter } from "next/router";
import { useWindow } from "@hooks/useWindow";

export const AuthorizeUserSignedIn = ({
  authenticated,
  loggedSession,
  appData,
}) => {
  const window = useWindow();

  if (!authenticated || !loggedSession?.user) return null;

  return (
    <>
      <Spacing height={2} />

      <Typography
        variant="body1"
        component="p"
        align="center"
        color="subtext"
        style={{
          fontSize: responsive(12, 14),
        }}
      >
        Signed in as{" "}
        <NextLink href={`${serviceLinks.accountDashboard}`}>
          <Typography
            variant="body1"
            component="span"
            style={{
              lineHeight: 1.7,
            }}
          >
            @{loggedSession?.user?.username}
          </Typography>
        </NextLink>
        <br />
        <NextLink
          href={`${serviceLinks.auth.logout}?to=${window.location.href}`}
        >
          Not you?
        </NextLink>
      </Typography>
    </>
  );
};
