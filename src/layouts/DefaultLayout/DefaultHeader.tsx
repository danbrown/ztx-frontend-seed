import { useState } from "react";
import { Flex, Container, Hidden, IconButton, useTheme } from "@wipsie/ui";
import { MenuOutlined } from "@ant-design/icons";
import ThemeSwitch from "@layouts/common/ThemeSwitch";
import { AppLogo } from "@components/AppLogo";
import { Config } from "@layouts/common/Config";
import { useScrollBlock } from "@hooks/useScrollBlock";

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
          <AppLogo />
        </Flex>

        <Flex direction="row" align="center" justify="between">
          <ThemeSwitch />
          <Config />
        </Flex>
      </Container>
    </Container>
  );
};
