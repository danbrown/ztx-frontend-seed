import { Container, Spacing, Typography, useTheme } from "@wipsie/ui";
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
import { useTranslate } from "@hooks/useTranslation";

export default function Home(props) {
  const theme = useTheme();

  const { posts } = useZustandSwr("posts", SWR_POSTS_KEY);

  const { translate } = useTranslate();

  return (
    <DefaultLayout>
      <Typography variant="h1" color="neutral">
        {translate("TITLE")}
      </Typography>

      <Spacing height={2} />

      <Typography variant="body1" color="subtext">
        Basic project setup with Next.js, TypeScript, I18n, Zustand, SWR, and
        Wipsie UI.
      </Typography>

      <Spacing height={2} />

      <Typography variant="h2" color="neutral">
        Posts:
      </Typography>

      <Spacing height={1} />

      {posts?.map((post) => (
        <Container mb={1} shape="square">
          <Typography variant="h4" color="neutral">
            {post.title}
          </Typography>

          <Spacing height={1} />

          <Typography variant="body1" color="subtext">
            {post.body}
          </Typography>
        </Container>
      ))}
    </DefaultLayout>
  );
}
