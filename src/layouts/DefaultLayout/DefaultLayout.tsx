import { Page, Switch, Flex, PageProps } from "@wipsie/ui";
import { Head, HeadProps } from "../../components/Head";
import { DefaultHeader } from "./DefaultHeader";
import { DefaultFooter } from "./DefaultFooter";

export type DefaultLayoutProps = PageProps & {
  children: React.ReactNode;
  meta?: HeadProps;
};

export const DefaultLayout = ({ meta, children, ...otherProps }: any) => {
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
