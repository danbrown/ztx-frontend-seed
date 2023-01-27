import { Typography } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const AuthorizeContextText = ({ appData }) => {
  const { authenticated, account } = useZustandStore("auth");

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
              {authenticated && account ? (
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
