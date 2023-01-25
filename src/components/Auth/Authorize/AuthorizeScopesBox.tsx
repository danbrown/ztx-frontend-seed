import {
  Container,
  responsive,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { CheckCircleIcon } from "@wipsie/icons";

export const AuthorizeScopesBox = ({
  authenticated,
  loggedSession,
  appData,
}) => {
  const theme = useTheme();

  if (!authenticated || !loggedSession?.user) return null;

  return (
    <>
      <Spacing height={3} />

      <Typography
        variant="body1"
        color="subtext"
        align="center"
        style={{
          fontWeight: 700,
        }}
      >
        This app will be able to:
      </Typography>

      <Spacing height={1} />

      {appData?.scope.map((scope) => (
        <Container
          fullWidth
          shape="square"
          backgroundColor="highlight"
          p={1}
          pl={1.5}
          style={{
            borderBottomStyle: "solid",
            borderWidth: "2px",
            borderColor: theme.palette.background,
          }}
        >
          <Typography
            variant="body1"
            component="span"
            align="left"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: responsive(12, 14),
            }}
          >
            <Typography
              variant="h2"
              component="span"
              color="success"
              align="left"
            >
              <CheckCircleIcon />
            </Typography>
            <Spacing width={1} />
            {getScopeDescription(scope)}
          </Typography>
        </Container>
      ))}
    </>
  );
};

const getScopeDescription = (scope) => {
  return {
    identity: "Access your name and username",
    email: "Access your email address",
  }[scope];
};
