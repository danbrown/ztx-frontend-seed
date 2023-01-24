import {
  Avatar,
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  Divider,
  Flex,
  Grid,
  IconButton,
  Input,
  InputProps,
  Link,
  responsive,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
import {
  CheckCircleIcon,
  CheckIcon,
  ClockCheckIcon,
  EyeIcon,
  Link01Icon,
  Lock01Icon,
  User01Icon,
} from "@wipsie/icons";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { serviceLinks } from "@config/links";
import {
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function Home(props) {
  const theme = useTheme();

  const authenticated = true;
  const loggedSession = {
    user: {
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      avatar: "https://avatars.githubusercontent.com/u/1012335?v=4",
    },
  };

  const appData = {
    name: "Neobeasts",
    description: "A creepy social network for all creatures",
    logo: "https://files.library.wipsie.com/project_avatars/31ff7363-167b-4fad-939b-0fab80b52dc6_neobeasts.jpg",
    scope: ["identity", "email"],
    redirectUri: "https://neobeasts.com/auth/callback",
    createdAt: "2021-08-01T00:00:00.000Z",
    ownerSource: "THIRD_PARTY",
  };

  return (
    <AuthLayout
      direction={{ xs: "column", md: "row" }}
      align="center"
      justify="center"
    >
      {/* Avatars box */}
      <AuthorizeAvatarsBox
        appData={appData}
        authenticated={authenticated}
        loggedSession={loggedSession}
      />

      {/* Source oriented text */}
      <AuthorizedContextText
        appData={appData}
        authenticated={authenticated}
        loggedSession={loggedSession}
      />

      {/* Signed in */}
      <AuthorizeUserSignedIn
        appData={appData}
        authenticated={authenticated}
        loggedSession={loggedSession}
      />

      {/* Scopes box */}
      <AuthorizeScopesBox
        appData={appData}
        authenticated={authenticated}
        loggedSession={loggedSession}
      />

      {/* App Information Box */}
      <AuthorizeAppInfoBox
        appData={appData}
        authenticated={authenticated}
        loggedSession={loggedSession}
      />

      {/* Action Buttons */}
      <AuthorizeActionButtons
        appData={appData}
        authenticated={authenticated}
        loggedSession={loggedSession}
      />

      {/* Not signed in - Login Form */}
      <AuthorizeLoginForm
        appData={appData}
        authenticated={authenticated}
        loggedSession={loggedSession}
      />
    </AuthLayout>
  );
}

const socialLoginProviders = [
  {
    name: "google",
    icon: <GoogleOutlined />,
    color: "danger",
  },
  {
    name: "facebook",
    icon: <FacebookOutlined />,
    color: "#3B5998",
  },
  {
    name: "github",
    icon: <GithubOutlined />,
    color: "neutral",
  },
  {
    name: "twitter",
    icon: <TwitterOutlined />,
    color: "#1DA1F2",
  },
];
const getScopeDescription = (scope) => {
  return {
    identity: "Access your name and username",
    email: "Access your email address",
  }[scope];
};

const LoginForm = () => {
  return (
    <Flex fullWidth p={2} pt={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Input
            fullWidth
            startAdornment={<User01Icon />}
            placeholder="Username or Email"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            fullWidth
            startAdornment={<Lock01Icon />}
            placeholder="Password"
            type="password"
            endAdornment={
              <IconButton backgroundColor="neutral" shape="round">
                <EyeIcon />
              </IconButton>
            }
            wrapperProps={{
              style: {
                paddingRight: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained">
            Authorize
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Spacing height={2} />
          <Flex fullWidth align="center" justify="center" direction="column">
            <NextLink href={`${serviceLinks.auth.register}`}>
              Not a user? Create an account
            </NextLink>
            <Spacing height={1} />
            <NextLink href={`${serviceLinks.auth.forgotPassword}`}>
              Forgot password?
            </NextLink>
          </Flex>
        </Grid>
        <Grid item xs={12}>
          <Spacing height={1} />
          <Typography variant="body1" color="subtext" align="center">
            Or
          </Typography>
          <Spacing height={1} />
        </Grid>
        <Grid item xs={12}>
          <Flex fullWidth align="center" justify="center" direction="row">
            {socialLoginProviders.map((provider) => (
              <IconButton
                variant="contained"
                backgroundColor={provider?.color}
                title={`Sign in with ${provider?.name}`}
                style={{ margin: 4 }}
                size="large"
              >
                {provider?.icon}
              </IconButton>
            ))}
          </Flex>
        </Grid>
      </Grid>
    </Flex>
  );
};

const AuthorizeAvatarsBox = ({ authenticated, loggedSession, appData }) => {
  const theme = useTheme();

  return (
    <>
      {authenticated && loggedSession?.user ? (
        <Flex align="center" justify="center" direction="row" p={3} pb={"0px"}>
          <Avatar
            src={appData?.logo}
            alt={appData?.name}
            title={appData?.name}
            xs="large"
            style={{ marginRight: theme.layout.spacingUnit }}
          />

          <Typography variant="h4" component="span" align="center">
            ...
          </Typography>

          <Avatar
            src={loggedSession?.user?.avatar}
            alt={loggedSession?.user?.name}
            title={loggedSession?.user?.name}
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
            xs="xlarge"
            style={{ marginRight: theme.layout.spacingUnit }}
          />
        </Flex>
      )}

      <Spacing height={2} />
    </>
  );
};

const AuthorizedContextText = ({ authenticated, loggedSession, appData }) => {
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

const AuthorizeUserSignedIn = ({ authenticated, loggedSession, appData }) => {
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
        <NextLink href={`${serviceLinks.auth.logout}`}>Not you?</NextLink>
      </Typography>
    </>
  );
};

const AuthorizeScopesBox = ({ authenticated, loggedSession, appData }) => {
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

const AuthorizeAppInfoBox = ({ authenticated, loggedSession, appData }) => {
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

const AuthorizeActionButtons = ({ authenticated, loggedSession, appData }) => {
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

const AuthorizeLoginForm = ({ authenticated, loggedSession, appData }) => {
  if (authenticated && loggedSession?.user) return null;

  return <LoginForm />;
};
