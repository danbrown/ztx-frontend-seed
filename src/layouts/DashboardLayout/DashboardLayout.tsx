import { Page, Switch, Flex, PageProps } from "@wipsie/ui";
import { Head, HeadProps } from "../../components/Head";
import { DefaultHeader } from "@layouts/DefaultLayout/DefaultHeader";
import { DefaultFooter } from "@layouts/DefaultLayout/DefaultFooter";

export type DashboardLayoutProps = PageProps & {
  children: React.ReactNode;
  meta?: HeadProps;
};

export const DashboardLayout = ({
  meta,
  children,
  ...otherProps
}: DashboardLayoutProps) => {
  return (
    <Page backgroundColor="shade" {...otherProps}>
      <Head {...meta} />

      <DefaultHeader />

      <Flex mt={{ xs: -1, md: 2 }} p={2} direction="column">
        {children}
      </Flex>

      <DefaultFooter />
    </Page>
  );
};
