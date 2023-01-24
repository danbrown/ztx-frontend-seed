import {
  Box,
  Fixed,
  Flex,
  Hidden,
  IconButton,
  Page,
  PageProps,
  Spacing,
  useTheme,
  useWidth,
} from "@wipsie/ui";
import { Head, HeadProps } from "@components/Head";
import { RecaptchaProvider } from "@components/Recaptcha/RecaptchaProvider";

export type AuthLayoutProps = PageProps & {
  meta?: HeadProps;
  children?: React.ReactNode;
  enableRecaptcha?: boolean;
};

export const AuthLayout = ({
  meta,
  children,
  enableRecaptcha = true,
  ...props
}: AuthLayoutProps) => {
  const width = useWidth();
  const theme = useTheme();

  return (
    <RecaptchaProvider enabled={enableRecaptcha}>
      <Page
        style={{
          zIndex: -1,
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        display="flex"
        {...props}
      >
        <Head {...meta} />

        {/* Central content */}
        <Flex
          height={"100vh"}
          width={width < 650 && "100vw"}
          justify="center"
          align={"center"}
        >
          <Box
            backgroundColor="background"
            shape="rounded"
            width={{ xs: "100%", sm: "380px" }}
            style={{
              position: width < 650.9 ? "absolute" : "unset",
              bottom: 0,
              left: 0,
              borderBottomLeftRadius: width < 650.9 && 0,
              borderBottomRightRadius: width < 650.9 && 0,
            }}
            p={0}
          >
            <Box
              display="flex"
              fullHeight
              fullWidth
              direction="column"
              align="center"
              justify="center"
              backgroundColor="transparent"
              style={{ position: "relative", overflow: "auto" }}
              maxHeight="100vh"
              p={0}
            >
              {children}
            </Box>
          </Box>
        </Flex>
      </Page>
    </RecaptchaProvider>
  );
};
