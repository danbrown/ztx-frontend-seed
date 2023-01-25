import { useTheme } from "@wipsie/ui";
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";

export default function Home(props) {
  const theme = useTheme();

  const { user } = useZustandStore("auth");

  return (
    <DefaultLayout>
      <code>
        <pre>{JSON.stringify({ user }, null, 2)}</pre>
      </code>
    </DefaultLayout>
  );
}
