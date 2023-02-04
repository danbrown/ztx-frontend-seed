import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import { Container, Flex, Spacing, Typography } from "@wipsie/ui";
import { IApp } from "@zustand/slices/apps.slice";

export const AppItemCard = ({ appData }: { appData: IApp }) => {
  return (
    <NextLink href={`${serviceLinks.dashboard}/${appData.slug}`}>
      <Container
        hoverable
        hoverBackgroundColor="highlight"
        backgroundColor="background"
      >
        <Flex fullWidth align="center" justify="start">
          <Typography variant="h4">{appData.name}</Typography>
          <Spacing width={1} />
          <Typography variant="body1" color="subtext">
            @{appData.slug}
          </Typography>
        </Flex>

        <Spacing height={1} />

        <Typography variant="body1" color="subtext">
          {appData.description}
        </Typography>
      </Container>
    </NextLink>
  );
};
