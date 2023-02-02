import { responsive, Spacing, Typography } from "@wipsie/ui";
import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { useRouter } from "next/router";
import { useWindow } from "@hooks/useWindow";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const AuthorizeUserSignedIn = ({ appData }) => {
  const window = useWindow();
  const { authenticated, account } = useZustandStore("auth");

  if (!authenticated || !account) return null;

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
            @{account?.username}
          </Typography>
        </NextLink>
        <br />
        <NextLink
          href={`${serviceLinks.auth.logout}?to=${window?.location?.href}`}
        >
          Not you?
        </NextLink>
      </Typography>
    </>
  );
};
