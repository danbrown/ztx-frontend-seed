import {
  Breadcrumbs,
  Button,
  Container,
  Flex,
  Grid,
  Loading,
  responsive,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useEffect, useState } from "react";
import apiWorker from "@utils/apiWorker";
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";
import { serviceLinks } from "@config/links";
import { browsersList } from "@config/index";
import { ISession } from "@zustand/slices/auth.slice";

export default function Home(props) {
  const theme = useTheme();
  const pageTitle = "Sessions";

  const {
    account,
    session,
    dispatchSessionRemoveAll,
    dispatchSessionGetAll,
    dispatchSessionRemove,
  } = useZustandStore("auth");

  const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(false);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [isRemovingSession, setIsRemovingSession] = useState<boolean>(false);

  const handleGetSessions = async () => {
    setIsLoadingSessions(true);
    await dispatchSessionGetAll().then((response) => {
      setSessions(response);
      setIsLoadingSessions(false);
    });
  };
  // start by loading sessions
  useEffect(() => {
    handleGetSessions();
  }, []);

  return (
    <DashboardLayout
      type="ACCOUNT"
      meta={{
        title: pageTitle,
      }}
    >
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: `${serviceLinks.accountDashboard}`,
          },
          {
            label: pageTitle,
            href: `${serviceLinks.accountDashboard}/sessions`,
            inactive: true,
          },
        ]}
      />

      <Spacing height={2} />

      <Flex align="center" justify="between" direction="row" fullWidth>
        <Typography variant="h1">{pageTitle}</Typography>

        <Button
          backgroundColor="danger"
          disabled={isLoadingSessions || isRemovingSession}
          onClick={() => {
            dispatchSessionRemoveAll();
          }}
        >
          kill all sessions
        </Button>
      </Flex>

      <Spacing height={4} />

      <Grid container>
        {sessions.map((thisSession) => (
          <Grid item xs={12} sm={6} md={4} key={thisSession.id}>
            <Container>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    color="subtext"
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: responsive(10, 12),
                    }}
                    title={thisSession.token}
                  >
                    {thisSession.token}
                  </Typography>
                </Grid>
                <Grid item xs={2.5}>
                  {browsersList.includes(thisSession.browser) && (
                    <Container backgroundColor="highlight" p={1}>
                      <img
                        src={`/static/browsers/${thisSession.browser
                          .toLowerCase()
                          .replace(" ", "-")}.png`}
                        alt=""
                      />
                    </Container>
                  )}
                </Grid>
                <Grid item xs={9.5}>
                  <Typography variant="body1">{thisSession.browser}</Typography>
                  <Typography variant="body1">{thisSession.os}</Typography>
                  <Typography variant="body1">{thisSession.device}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="subtext">
                    Created at:{" "}
                    {new Date(thisSession.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {thisSession.token === session.token && (
                    <Flex fullHeight align="center" justify="start">
                      <Typography variant="h5" color="success">
                        Current Session
                      </Typography>
                    </Flex>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Button
                    backgroundColor="danger"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={isRemovingSession || isLoadingSessions}
                    onClick={() => {
                      setIsRemovingSession(true);
                      dispatchSessionRemove(thisSession.token).then(() => {
                        setIsRemovingSession(false);
                        handleGetSessions();
                      });
                    }}
                  >
                    Logout Session
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        ))}
      </Grid>

      {/* Loading */}
      {isLoadingSessions && (
        <Flex fullWidth align="center" justify="center" mt={2}>
          <Loading type="dots" />
        </Flex>
      )}
    </DashboardLayout>
  );
}
