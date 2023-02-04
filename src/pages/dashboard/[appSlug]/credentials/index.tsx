import {
  Breadcrumbs,
  Button,
  Flex,
  Grid,
  Loading,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useEffect, useState } from "react";
import apiWorker from "@utils/apiWorker";
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";
import { serviceLinks } from "@config/links";
import { NextLink } from "@components/NextLink";
import { AppItemCard } from "@components/Apps/AppItemCard";
import { SlugNextLink } from "@components/SlugNextLink";
import { CredentialItemCard } from "@components/Apps/CredentialItemCard";

export default function Home(props) {
  const theme = useTheme();

  const pageTitle = "Credentials";

  const { currentApp, dispatchAppCredentialsGetAll } = useZustandStore("apps");

  const [credentials, setCredentials] = useState([]);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);

  const handleGetCredentials = async () => {
    setIsLoadingCredentials(true);
    await dispatchAppCredentialsGetAll(currentApp.id).then((response) => {
      setCredentials(response);
      setIsLoadingCredentials(false);
    });
  };
  // start by loading credentials, after currentApp is set
  useEffect(() => {
    if (currentApp) {
      handleGetCredentials();
    }
  }, [currentApp]);

  return (
    <DashboardLayout
      type="APP"
      meta={{
        title: pageTitle,
      }}
    >
      <Breadcrumbs
        linkComponent={SlugNextLink}
        items={[
          {
            label: "App Dashboard",
            href: `${serviceLinks.appDashboard}`,
          },
          {
            label: pageTitle,
            href: `${serviceLinks.appDashboard}/credentials`,
            inactive: true,
          },
        ]}
      />
      <Spacing height={2} />
      <Flex align="center" justify="between" direction="row" fullWidth>
        <Typography variant="h1">{pageTitle}</Typography>

        <SlugNextLink href={`${serviceLinks.appDashboard}/credentials/new`}>
          <Button variant="contained" backgroundColor="primary">
            New Credential
          </Button>
        </SlugNextLink>
      </Flex>
      <Spacing height={4} />

      {/* Credentials List */}
      <Grid container spacing={2}>
        {credentials.map((thisCredential) => (
          <Grid item xs={12} sm={6} md={4} key={thisCredential.id}>
            <CredentialItemCard credentialData={thisCredential} />
          </Grid>
        ))}
      </Grid>

      {credentials.length === 0 && !isLoadingCredentials && (
        <Flex fullWidth align="center" justify="center" mt={2}>
          <Typography variant="h3">No credentials available.</Typography>
        </Flex>
      )}

      {/* LLoading */}
      {isLoadingCredentials && (
        <Flex fullWidth align="center" justify="center" mt={2}>
          <Loading type="dots" />
        </Flex>
      )}
    </DashboardLayout>
  );
}
