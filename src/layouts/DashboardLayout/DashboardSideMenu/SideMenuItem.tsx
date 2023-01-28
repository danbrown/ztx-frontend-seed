import { NextLink } from "@components/NextLink";
import { Button, Container, Flex, responsive, useTheme } from "@wipsie/ui";

const MenuItem = ({ label, link, icon, active, external }) => {
  const theme = useTheme();

  return (
    <NextLink
      href={link}
      target={external ? "_blank" : undefined}
      rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <Button
        size="large"
        fullWidth
        align="left"
        shape="square"
        active={active}
        variant="ghost"
        color={active ? theme.palette.primary[500] : theme.palette.subtext}
        style={{
          textTransform: "capitalize",
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: responsive(13, 15),
          fontWeight: 500,
          borderRight: active ? "4px solid" : "",
        }}
      >
        <Flex direction="row" wrap="nowrap" align="center">
          <Container
            mr={1}
            p={0.8}
            backgroundColor={active ? theme.palette.primary[500] : "highlight"}
            style={{
              color: active ? theme.palette.text : theme.palette.subtext,
            }}
          >
            {icon}
          </Container>
          {label}
        </Flex>
      </Button>
    </NextLink>
  );
};

export default MenuItem;
