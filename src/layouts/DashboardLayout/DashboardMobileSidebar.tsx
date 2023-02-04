import { Flex, Fixed, Snackbar } from "@wipsie/ui";
import { DashboardSideMenu } from "./DashboardSideMenu";

export const DashboardMobileSidebar = ({ type, visible, handleChange }) => {
  return (
    <Snackbar
      id="sidebar"
      open={visible}
      position="center left"
      spacing={0}
      animation="slideInLeft"
      backdrop
      fullHeight
      onBackdropClick={handleChange}
      portalProps={{
        style: {
          zIndex: 99,
          position: "fixed",
        },
      }}
    >
      <Flex
        shape="square"
        fullHeight
        maxWidth="300px"
        fullWidth
        p={0}
        style={{ overflow: "auto" }}
      >
        <Fixed
          type="sticky"
          style={{
            overflow: "auto",
            width: "100vw",
            height: "100vh",
            zIndex: 200,
          }}
        >
          <DashboardSideMenu type={type} handleChange={handleChange} />
        </Fixed>
      </Flex>
    </Snackbar>
  );
};
