import { Typography } from "@wipsie/ui";

export const AuthorizeContextText = ({
  authenticated,
  loggedSession,
  appData,
}) => {
  return (
    <>
      {
        {
          THIRD_PARTY: (
            <Typography
              variant="body1"
              component="p"
              align="center"
              color="subtext"
            >
              {authenticated && loggedSession?.user ? (
                <>
                  A third party app
                  <br />
                  <Typography
                    variant="h3"
                    component="span"
                    style={{
                      lineHeight: 1.7,
                    }}
                  >
                    {appData?.name}
                  </Typography>
                  <br />
                  wants to access your account
                </>
              ) : (
                <>
                  Login to proceed using the app
                  <br />
                  <Typography
                    variant="h3"
                    component="span"
                    style={{
                      lineHeight: 1.7,
                    }}
                  >
                    {appData?.name}
                  </Typography>
                </>
              )}
            </Typography>
          ),

          INTERNAL: (
            <Typography
              variant="body1"
              component="p"
              align="center"
              color="subtext"
            >
              Use your account to access
              <br />
              <Typography
                variant="h3"
                component="span"
                style={{
                  lineHeight: 1.7,
                }}
              >
                {appData?.name}
              </Typography>
            </Typography>
          ),
        }[appData?.ownerSource]
      }
    </>
  );
};
