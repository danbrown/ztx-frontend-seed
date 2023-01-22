import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Input,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
import { User01Icon } from "@wipsie/icons";

export default function Home(props) {
  const theme = useTheme();

  const { addFish, fishes } = useZustandStore("fishes");
  const { posts } = useZustandSwr("posts", SWR_POSTS_KEY);

  return (
    <DefaultLayout>
      <NextLink href="/dois">Page Dois</NextLink>

      <Divider spacing={2} />

      <Container
        shape="square"
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: theme.palette.highlight,
        }}
      >
        <Typography variant="h1" color="neutral">
          Hello World
        </Typography>
        <Spacing height={1} />
        <Typography variant="h3" color="subtext">
          This is a subtitle
        </Typography>
        <Spacing height={1} />
        <Input
          shape="square"
          placeholder="Type something..."
          startAdornment={<User01Icon />}
        />
        <Divider spacing={2} />
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, voluptatem?
        </Typography>
        <Spacing height={2} />
        <Container
          display="flex"
          direction="row"
          shape="square"
          backgroundColor="highlight"
        >
          <Typography variant="h4" color="neutral">
            Fishes:
          </Typography>
          <Spacing width={1} />
          <Typography variant="h4" color="subtext">
            {fishes}
          </Typography>
        </Container>
        <Spacing height={4} />
        <Grid container>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              backgroundColor="neutral"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              neutral
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              backgroundColor="success"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Success
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              backgroundColor="info"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Info
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              backgroundColor="warning"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Warning
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              backgroundColor="danger"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Danger
            </Button>
          </Grid>
        </Grid>
      </Container>

      <code>
        <pre>
          POSTS
          <br />
          {JSON.stringify(posts, null, 2)}
          <br />
        </pre>
      </code>
    </DefaultLayout>
  );
}
