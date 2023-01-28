import { useState } from "react";
import {
  Flex,
  Box,
  Hidden,
  Fixed,
  IconButton,
  useScrollBlock,
  useWidth,
  useTheme,
} from "@wipsie/ui";
import { MenuOutlined } from "@ant-design/icons";
import { DashboardMobileSidebar } from "./DashboardMobileSidebar";
import { Config } from "@layouts/common/Config";

export const DashboardHeader = () => {
  const theme = useTheme();
  const width = useWidth(2000);
  const [menuVisible, setMenuVisible] = useState(false);
  const [, setLocked] = useScrollBlock();

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
    setLocked(!menuVisible);
  };

  // Mobile Sidebar
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const handleMobileSidebar = () => {
    setMobileSidebarVisible(!mobileSidebarVisible);
    setLocked(!mobileSidebarVisible);
  };

  return (
    <>
      <Fixed
        type={
          width > parseInt(theme.breakpoints.md.min.replace("px", ""))
            ? "sticky"
            : "fixed"
        }
        position="top"
        style={{
          width: "100%",
          zIndex: 9,
        }}
      >
        <Flex fullWidth align="center" justify="center" p={0}>
          <Box
            width="100%"
            display="flex"
            direction="row"
            align="center"
            justify="between"
            shape="square"
            backgroundColor="background"
            p={1}
            pl={2}
            pr={2}
            style={{}}
          >
            <Flex direction="row" align="center" justify="between">
              <Hidden xs={false} md={true}>
                <IconButton
                  size="large"
                  icon={<MenuOutlined />}
                  onClick={handleMobileSidebar}
                />
              </Hidden>
            </Flex>

            <Flex direction="row" align="center" justify="between">
              <Config />
            </Flex>
          </Box>
        </Flex>
      </Fixed>

      <DashboardMobileSidebar
        visible={mobileSidebarVisible}
        handleChange={handleMobileSidebar}
      />

      {/* content spacing fix */}
      <Flex
        p={"0px"}
        pt={{ xs: 8, sm: 8, md: "0px" }}
        direction="column"
        fullWidth
        // {...boxProps}
      ></Flex>
    </>
  );
};
