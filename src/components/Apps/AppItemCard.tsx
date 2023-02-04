import { NextLink } from "@components/NextLink";
import { serviceLinks } from "@config/links";
import {
  Button,
  Container,
  Flex,
  Grid,
  responsive,
  Spacing,
  Typography,
} from "@wipsie/ui";
import { IApp } from "@zustand/slices/apps.slice";

export const AppItemCard = ({ appData }: { appData: IApp }) => {
  return (
    <Container
      hoverable
      hoverBackgroundColor="highlight"
      backgroundColor="background"
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Flex fullWidth align="center" justify="start">
            <Typography variant="h4">{appData.name}</Typography>
            <Spacing width={1} />
            <Typography
              variant="body1"
              color="subtext"
              style={{
                fontSize: responsive(12, 14),
              }}
            >
              @{appData.slug}
            </Typography>
          </Flex>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="subtext"
            style={{
              fontSize: responsive(12, 14),
            }}
          >
            {appData.description}
          </Typography>
          <Spacing height={1} />
        </Grid>

        <Grid item xs={12}>
          <NextLink href={`${serviceLinks.dashboard}/${appData.slug}`}>
            <Button fullWidth backgroundColor="primary" size="small">
              View App
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </Container>
  );
};
