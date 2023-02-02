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

export default function Home(props) {
  const theme = useTheme();
  const router = useRouter();
  const { id: appId } = router.query;

  const pageTitle = appId ? `Edit App` : `New App`;

  const { dispatchAppsGetAll } = useZustandStore("apps");

  const [apps, setApps] = useState([]);

  return (
    <DashboardLayout
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
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, similique
      dolor hic, assumenda ullam quam reprehenderit exercitationem aut eius
      repellat cumque nam harum impedit aspernatur deleniti rerum illo illum
      repellendus aperiam fuga. Suscipit exercitationem commodi laborum ipsum
      itaque deleniti voluptas iure dicta necessitatibus, excepturi perspiciatis
      veritatis officia, inventore beatae magni ab provident hic architecto
      repudiandae asperiores aliquid esse odit? Illo ad aut distinctio quaerat
      doloribus provident reprehenderit at quas! Tenetur explicabo, eaque cum
      illo voluptatem facere laudantium, maxime odio quam est dolores hic
      nostrum quis sint pariatur natus ipsam qui ex impedit aut, ad eligendi
      ratione! Iure cumque reiciendis expedita!
    </DashboardLayout>
  );
}
