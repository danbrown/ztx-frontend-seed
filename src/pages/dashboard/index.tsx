import { useTheme } from "@wipsie/ui";
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";

export default function Home(props) {
  const theme = useTheme();

  const { addFish, fishes } = useZustandStore("fishes");
  const { posts } = useZustandSwr("posts", SWR_POSTS_KEY);

  return (
    <DefaultLayout>
      <NextLink href="/dois">Page Dois</NextLink>
    </DefaultLayout>
  );
}
