import { useState } from "react";
import {
  Flex,
  Link,
  Accordion,
  Button,
  Box,
  Container,
  Hidden,
  Fixed,
  IconButton,
  responsive,
  useTheme,
} from "@wipsie/ui";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ThemeSwitch from "@layouts/common/ThemeSwitch";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { serviceLinks } from "@config/links";
import { NextLink } from "@components/NextLink";
import { ZetahexAppLogo } from "@components/ZetahexAppLogo";
import { Config } from "@layouts/common/Config";
import { useScrollBlock } from "@hooks/useScrollBlock";
import { LogoutButton } from "@layouts/common/LogoutButton";

export const DefaultHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [locked, setLocked] = useScrollBlock();
  const theme = useTheme();

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
    setLocked(!menuVisible);
  };

  return (
    <Container
      display="flex"
      width="100vw"
      align="center"
      justify="center"
      shape="square"
      p={0}
    >
      <Container
        width="100%"
        maxWidth="1200px"
        display="flex"
        direction="row"
        align="center"
        justify="between"
        shape="square"
        p={1}
      >
        <Flex direction="row" align="center" justify="between">
          <Hidden xs={false} sm={true}>
            <IconButton
              size="medium"
              icon={<MenuOutlined />}
              onClick={handleMenuClick}
            />
          </Hidden>
          <ZetahexAppLogo />
        </Flex>

        <Flex direction="row" align="center" justify="between">
          <ThemeSwitch />
          <Config />
          <LogoutButton />
        </Flex>
      </Container>
    </Container>
  );
};
