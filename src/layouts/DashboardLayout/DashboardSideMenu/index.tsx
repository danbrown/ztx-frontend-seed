import {
  Box,
  Container,
  Fixed,
  IconButton,
  Hidden,
  ButtonGroup,
  Button,
  useTheme,
  Spacing,
} from "@wipsie/ui";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./SideMenu.module.css";
import { DashboardRoutesBuilder } from "./DashboardRoutesBuilder";
import { ACCOUNT_DASHBOARD_ROUTES } from "@routes/accountDashboardRoutes";
import { useState } from "react";
import { ZetahexAppLogo } from "@components/ZetahexAppLogo";

export const DashboardSideMenu = ({ handleChange }) => {
  const theme = useTheme();

  const [listing, setListing] = useState<"APPS" | "CURRENT">("CURRENT");

  return (
    <Container
      shape="square"
      fullWidth
      style={{
        overflowY: "auto",
        height: "100vh",
      }}
      className={styles["SideBar-no-scroll"]}
      p={0}
    >
      <Hidden xs={false} md={true}>
        <Fixed type="absolute" position="top right" spacing={1.5}>
          <IconButton
            onClick={handleChange}
            icon={<CloseOutlined />}
            size="medium"
            color="basic"
          />
        </Fixed>
      </Hidden>

      <Box>
        <ZetahexAppLogo />
        <Spacing height={2} />

        <Container shape="rounded" p={1} backgroundColor="shade">
          <ButtonGroup shape="rounded" size="mini" fullWidth>
            <Button
              backgroundColor={
                listing === "CURRENT" ? "primary" : theme.palette.shade
              }
              onClick={() => setListing("CURRENT")}
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  maxWidth: "120px",
                }}
              >
                Dashboard
              </span>
            </Button>
            <Button
              backgroundColor={
                listing === "APPS" ? "primary" : theme.palette.shade
              }
              onClick={() => setListing("APPS")}
            >
              All Apps
            </Button>
          </ButtonGroup>
        </Container>
      </Box>

      {listing === "CURRENT" && (
        <DashboardRoutesBuilder routes={ACCOUNT_DASHBOARD_ROUTES} />
      )}
    </Container>
  );
};
