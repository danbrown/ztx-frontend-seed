/* eslint-disable react/display-name */
import { useState, useEffect } from "react";
import {
  Page,
  Flex,
  Fixed,
  Hidden,
  Grid,
  PageProps,
  BoxProps,
} from "@wipsie/ui";
import { Head, HeadProps } from "@components/Head";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSideMenu } from "./DashboardSideMenu";
import LoadingScreen from "@components/LoadingScreen";
import { AuthProvider, withAuth } from "@providers/AuthProvider";
import { useRouter } from "next/router";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export type DashboardLayoutProps = PageProps & {
  meta?: HeadProps;
  boxProps?: Omit<BoxProps, "ref">;
  children: React.ReactNode;
  type: "ACCOUNT" | "APP";
};

export function DashboardLayout({
  meta,
  children,
  boxProps,
  type,
  ...otherProps
}: DashboardLayoutProps) {
  const DEBUG = false;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // TODO: loading the current app

  const { currentApp, dispatchAppsGetCurrent } = useZustandStore("apps");

  const { appSlug } = router.query;

  useEffect(() => {
    if (appSlug) {
      setIsLoading(true);
      dispatchAppsGetCurrent(appSlug as string).then((response) => {
        setIsLoading(false);
      });
    }
  }, [appSlug]);

  if (isLoading && type === "APP")
    return <LoadingScreen backgroundColor="shade" />;

  return (
    <AuthProvider>
      <Page backgroundColor="shade" {...otherProps}>
        <Head {...meta} />
        <Grid container spacing={0} noWrap>
          <Grid item xs="0px" md="280px">
            <Fixed
              type="sticky"
              style={{
                height: "100vh",
                zIndex: 1,
              }}
            >
              <Hidden xs={true} md={false} style={{ height: "100%" }}>
                <DashboardSideMenu type={type} handleChange={null} />
              </Hidden>
            </Fixed>
          </Grid>
          <Grid
            item
            xs={12}
            md="calc(100vw - 280px)"
            style={{ height: "100%" }}
          >
            <Flex
              p={0}
              direction="column"
              style={{
                position: "relative",
                maxWidth: "100vw",
                minHeight: "100vh",
              }}
              fullWidth
            >
              <DashboardHeader type={type} />

              <Flex p={2} direction="column" fullWidth {...boxProps}>
                {isLoading ? (
                  <LoadingScreen backgroundColor="shade" />
                ) : (
                  children
                )}

                {DEBUG && (
                  <code>
                    <pre>{JSON.stringify(currentApp, null, 2)}</pre>
                  </code>
                )}
              </Flex>
            </Flex>
          </Grid>
        </Grid>
      </Page>
    </AuthProvider>
  );
}
