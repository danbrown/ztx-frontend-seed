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
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";
import { serviceLinks } from "@config/links";
import { useRouter } from "next/router";
import { EditAppForm } from "@components/Apps/EditAppForm";

export default function Home(props) {
  const theme = useTheme();
  const router = useRouter();
  const { id: appId } = router.query;

  const pageTitle = appId ? `Edit App` : `New App`;

  const { dispatchAppsGetSingle } = useZustandStore("apps");

  const [appData, setAppData] = useState(null);

  useEffect(() => {
    if (appId) {
      dispatchAppsGetSingle(appId as string)
        .then((res) => {
          setAppData(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [appId]);

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
            href: `${serviceLinks.accountDashboard}/apps/new`,
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
      <EditAppForm initialData={appData} />
    </DashboardLayout>
  );
}
