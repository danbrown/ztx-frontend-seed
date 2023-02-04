import { useTheme } from "@wipsie/ui";
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
import { useRouter } from "next/router";
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";

export default function Home(props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <DashboardLayout type="APP">
      <NextLink href="/dois">Page Dois</NextLink>

      {router.query.appSlug}
    </DashboardLayout>
  );
}
