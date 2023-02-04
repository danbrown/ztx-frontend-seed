import {
  Breadcrumbs,
  Container,
  Flex,
  Grid,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";
import { serviceLinks } from "@config/links";
import { EditAccountForm } from "@components/Accounts/EditAccountForm";

export default function Home(props) {
  const theme = useTheme();

  const pageTitle = "My Profile";

  const { account } = useZustandStore("auth");

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
            href: `${serviceLinks.accountDashboard}/profile`,
            inactive: true,
          },
        ]}
      />

      <Spacing height={2} />

      <Flex align="center" justify="between" direction="row" fullWidth>
        <Typography variant="h1">{pageTitle}</Typography>
      </Flex>

      <Spacing height={4} />

      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <Container>
            image avatar circle with verified badge
            <Spacing height={2} />
            image cover square
            <Spacing height={2} />
            <Typography variant="body1" color="subtext">
              Member since: {new Date(account.createdAt).toLocaleDateString()}
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Container>
            <Typography variant="h2">Account Settings</Typography>
            <Spacing height={2} />
            <EditAccountForm />
          </Container>
        </Grid>
      </Grid>

      <Spacing height={2} />
    </DashboardLayout>
  );
}
