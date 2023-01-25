import { SITE_TITLE } from "@config/index";
import { Flex, Typography, Container } from "@wipsie/ui";

export const DefaultFooter = () => {
  return (
    <Flex width="100vw" mt={2}>
      <Container
        display="flex"
        direction={{ xs: "column", md: "row" }}
        align={{ xs: "start", md: "center" }}
        justify="between"
        shape="square"
        fullWidth
      >
        <Typography variant="body1">
          © {new Date().getFullYear()} {SITE_TITLE} - All Rights Reserved.
        </Typography>
      </Container>
    </Flex>
  );
};
