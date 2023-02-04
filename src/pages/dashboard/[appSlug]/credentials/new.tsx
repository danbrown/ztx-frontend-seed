import {
  Breadcrumbs,
  Button,
  Flex,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useEffect, useState } from "react";
import apiWorker from "@utils/apiWorker";
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";
import { serviceLinks } from "@config/links";
import { useRouter } from "next/router";
import { EditAppForm } from "@components/Apps/EditAppForm";
import { EditCredentialForm } from "@components/Apps/EditCredentialForm";
import { SlugNextLink } from "@components/SlugNextLink";

export default function Home(props) {
  const theme = useTheme();
  const router = useRouter();
  const { id: credentialId } = router.query;

  const pageTitle = credentialId ? `Edit Credential` : `New Credential`;

  const { currentApp, dispatchAppCredentialsGetSingle } =
    useZustandStore("apps");

  const [credentialData, setCredentialData] = useState(null);

  useEffect(() => {
    if (currentApp && credentialId) {
      dispatchAppCredentialsGetSingle(currentApp.id, credentialId as string)
        .then((res) => {
          setCredentialData(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentApp, credentialId]);

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
            label: "Credentials",
            href: `${serviceLinks.appDashboard}/credentials`,
          },
          {
            label: pageTitle,
            href: `${serviceLinks.appDashboard}/credentials/new`,
            inactive: true,
          },
        ]}
      />
      <Spacing height={2} />
      <Flex align="center" justify="between" direction="row" fullWidth>
        <Typography variant="h1">{pageTitle}</Typography>
      </Flex>
      <Spacing height={4} />

      {/* Form */}
      <EditCredentialForm initialData={credentialData} />
    </DashboardLayout>
  );
}
