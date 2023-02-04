import { Button, useTheme } from "@wipsie/ui";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
// import NextLink from "next/link";

export default function Home(props) {
  const theme = useTheme();

  const { posts, testPromise } = useZustandSwr("posts", SWR_POSTS_KEY);

  return (
    <DefaultLayout>
      <NextLink href="/">Um</NextLink>

      <Button onClick={() => {}}>Add Fish</Button>

      <code>
        POSTS
        <br />
        {JSON.stringify(posts)}
        <br />
      </code>

      <Button
        onClick={() => {
          testPromise().then((res) => {
            alert(res);
          });
        }}
      >
        Test Promise
      </Button>
    </DefaultLayout>
  );
}
