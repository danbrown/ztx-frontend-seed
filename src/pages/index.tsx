import { Button, useTheme } from "@wipsie/ui";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
// import NextLink from "next/link";

export default function Home(props) {
  const theme = useTheme();

  // const fishes = useHydratedStore("fishes");
  const { addFish, fishes } = useZustandStore("fishes");
  const { posts } = useZustandSwr("posts", SWR_POSTS_KEY);

  return (
    <DefaultLayout>
      {fishes}

      <Button
        onClick={() => {
          addFish();
        }}
      >
        Add Fish
      </Button>

      <code>
        POSTS
        <br />
        {JSON.stringify(posts)}
        <br />
      </code>

      <NextLink href="/dois">Dois</NextLink>
    </DefaultLayout>
  );
}
