import { useState } from "react";
import {
  Flex,
  Button,
  Collapsible,
  useTheme,
  Container,
  responsive,
} from "@wipsie/ui";
import SubMenuItem from "./SideSubMenuItem";
import { replaceSlug } from "@utils/replaceSlug";
import { ChevronDownIcon, ChevronRightIcon } from "@wipsie/icons";

const MenuGroup = ({ ref, label, link, icon, items, current }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(link && current.includes(link));

  const active = link && current.includes(link);

  return (
    <Collapsible
      as={Flex}
      p={0}
      ref={ref}
      direction="column"
      align="center"
      justify="center"
      style={{ overflow: "hidden" }}
      open={open}
      icon={false}
      onClick={() => setOpen(!open)}
      fullWidth
      header={
        <Button
          size="large"
          endIcon={open ? <ChevronDownIcon /> : <ChevronRightIcon />}
          shape="square"
          align="spaced"
          variant="ghost"
          color={
            link && current.includes(link)
              ? theme.palette.primary[500]
              : theme.palette.text
          }
          active={active}
          fullWidth
          style={{
            textTransform: "capitalize",
            paddingLeft: 20,
            paddingRight: 20,
            borderRight: active ? "4px solid" : "",
            fontSize: responsive(13, 15),
            fontWeight: 500,
          }}
        >
          <Flex direction="row" wrap="nowrap" align="center">
            <Container
              mr={1}
              p={0.8}
              backgroundColor={active ? theme.palette.primary[500] : "shade"}
              style={{
                color: active ? theme.palette.white : theme.palette.subtext,
              }}
            >
              {icon}
            </Container>

            {label}
          </Flex>
        </Button>
      }
    >
      <Flex direction="column" fullWidth>
        {items.map((item) => {
          return (
            <SubMenuItem
              label={item.label}
              link={replaceSlug(item.link, link)}
              icon={item.icon}
              current={current}
              external={item.external}
            />
          );
        })}
      </Flex>
    </Collapsible>
  );
};

export default MenuGroup;
