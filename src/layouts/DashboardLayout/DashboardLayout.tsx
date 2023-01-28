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

export type DashboardLayoutProps = PageProps & {
  meta?: HeadProps;
  boxProps?: Omit<BoxProps, "ref">;
  children: React.ReactNode;
};

export function DashboardLayout({
  meta,
  children,
  boxProps,
  ...otherProps
}: DashboardLayoutProps) {
  const [isLoading, setIsLoading] = useState(false); // TODO: laoding the current app

  return (
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
              <DashboardSideMenu handleChange={null} />
            </Hidden>
          </Fixed>
        </Grid>
        <Grid item xs={12} md="calc(100vw - 280px)" style={{ height: "100%" }}>
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
            <DashboardHeader />

            <Flex p={2} direction="column" fullWidth {...boxProps}>
              {isLoading ? <LoadingScreen backgroundColor="shade" /> : children}
            </Flex>
          </Flex>
        </Grid>
      </Grid>
    </Page>
  );
}
