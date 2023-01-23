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
  Portal,
  useScrollBlock,
  responsive,
  useTheme,
} from "@wipsie/ui";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ThemeSwitch from "@layouts/common/ThemeSwitch";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { serviceLinks } from "@config/links";

export const DefaultHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [locked, setLocked] = useScrollBlock();
  const theme = useTheme();

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
    setLocked(!menuVisible);
  };

  return (
    <Flex width="100vw" align="center" justify="center" p={0}>
      <Container
        width="100%"
        display="flex"
        direction="row"
        align="center"
        justify="between"
        shape="square"
        p={1}
        pl={2}
        pr={2}
      >
        <a
          href={`${serviceLinks.main}`}
          style={{ width: responsive(100, 200) }}
        >
          {theme.type === "dark" ? (
            <img src="/static/logo/white.svg" alt="Zetahex" />
          ) : (
            <img src="/static/logo/black.svg" alt="Zetahex" />
          )}
        </a>
        <Flex direction="row" align="center" justify="between">
          <ThemeSwitch />
          <Hidden xs={false} sm={true}>
            <IconButton
              size="large"
              icon={<MenuOutlined />}
              onClick={handleMenuClick}
            />
          </Hidden>
        </Flex>
      </Container>
    </Flex>
  );
};
