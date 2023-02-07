import {
  Breadcrumbs,
  Button,
  Container,
  Flex,
  Grid,
  Loading,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";
import { serviceLinks } from "@config/links";
import { NextLink } from "@components/NextLink";
import { AppItemCard } from "@components/Apps/AppItemCard";

export default function Home(props) {
  const theme = useTheme();

  const pageTitle = "App Profiles";

  const { dispatchAccountGetAllProfiles } = useZustandStore("auth");

  const [profiles, setProfiles] = useState([]);
  const [isLoadingApps, setIsLoadingApps] = useState(false);

  const handleGetApps = async () => {
    setIsLoadingApps(true);
    await dispatchAccountGetAllProfiles().then((response) => {
      setProfiles(response);
      setIsLoadingApps(false);
    });
  };
  // start by loading apps
  useEffect(() => {
    handleGetApps();
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
            label: "All Apps",
            href: `${serviceLinks.accountDashboard}/apps`,
          },
          {
            label: pageTitle,
            href: `${serviceLinks.accountDashboard}/apps/profiles`,
            inactive: true,
          },
        ]}
      />
      <Spacing height={2} />
      <Flex align="center" justify="between" direction="row" fullWidth>
        <Typography variant="h1">{pageTitle}</Typography>

        <NextLink href={`${serviceLinks.accountDashboard}/apps/new`}>
          <Button variant="contained" backgroundColor="primary">
            Create App
          </Button>
        </NextLink>
      </Flex>
      <Spacing height={4} />

      {/* Apps List */}
      <Grid container spacing={2}>
        {profiles.map((thisProfile) => (
          <Grid item xs={12} sm={6} md={4} key={thisProfile.id}>
            <Container>
              <code>
                <pre>{JSON.stringify(thisProfile, null, 2)}</pre>
              </code>
            </Container>
          </Grid>
        ))}
      </Grid>

      {profiles.length === 0 && !isLoadingApps && (
        <Flex fullWidth align="center" justify="center" mt={2}>
          <Typography variant="h3">No profiles available.</Typography>
        </Flex>
      )}

      {/* LLoading */}
      {isLoadingApps && (
        <Flex fullWidth align="center" justify="center" mt={2}>
          <Loading type="dots" />
        </Flex>
      )}
    </DashboardLayout>
  );
}
