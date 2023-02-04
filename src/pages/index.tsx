import { Divider, Grid, Spacing, Typography, useTheme } from "@wipsie/ui";
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
import { User01Icon } from "@wipsie/icons";
import { ZetaContainer } from "@components/ZetaComponents/ZetaContainer";
import { ZetaInput } from "@components/ZetaComponents/ZetaInput";
import { ZetaHeader2 } from "@components/ZetaComponents/ZetaHeader2";
import { ZetaButton } from "@components/ZetaComponents/ZetaButton";
import { ZetaMaterials } from "@components/ZetaComponents/ZetaMaterials";
import apiWorker from "@utils/apiWorker";
import { useTranslation } from "react-i18next";
import { useTranslate } from "@hooks/useTranslation";

export default function Home(props) {
  const theme = useTheme();

  const { posts } = useZustandSwr("posts", SWR_POSTS_KEY);

  const { translate, languages, language, changeLanguage } = useTranslate();

  return (
    <DefaultLayout>
      <ZetaMaterials />

      <Typography variant="h1" color="neutral">
        {translate("TITLE")}
      </Typography>

      <ZetaButton
        onClick={() => {
          const languageIndex = languages.indexOf(language);
          const nextLanguageIndex =
            languages.length - 1 === languageIndex ? 0 : languageIndex + 1;
          const nextLanguage = languages[nextLanguageIndex];

          changeLanguage(nextLanguage);
        }}
      >
        {language}
      </ZetaButton>

      <NextLink href="/dois">Page Dois</NextLink>

      <Divider spacing={2} />

      <ZetaContainer
        shape="square"
        p={3}
        pr={4}
        style={
          {
            // borderStyle: "solid",
            // borderWidth: 1,
            // borderColor: theme.palette.highlight,
          }
        }
      >
        <Typography variant="h1" color="neutral">
          Hello World
        </Typography>
        <Spacing height={1} />
        <Typography variant="h3" color="subtext">
          This is a subtitle
        </Typography>
        <Spacing height={1} />
        <ZetaInput
          shape="square"
          placeholder="Type something..."
          startAdornment={<User01Icon />}
        />
        <Divider spacing={2} />
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          <br />
          impedit dignissimos dolor explicabo neque eveniet, ipsum sapiente ex
          <br />
          iusto minus.
        </Typography>
        <Spacing height={2} />
        <ZetaHeader2
          display="flex"
          direction="row"
          shape="square"
          backgroundColor="highlight"
        >
          <Typography variant="h4" color="neutral">
            Fishes:
          </Typography>
          <Spacing width={1} />
          <Typography variant="h4" color="subtext">
            0
          </Typography>
        </ZetaHeader2>

        <Spacing height={4} />

        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <ZetaButton
              backgroundColor="neutral"
              shape="square"
              fullWidth
              onClick={() => {}}
            >
              neutral
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ZetaButton
              backgroundColor="success"
              shape="square"
              fullWidth
              onClick={() => {}}
            >
              Success
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ZetaButton
              backgroundColor="info"
              shape="square"
              fullWidth
              onClick={() => {}}
            >
              Info
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ZetaButton
              backgroundColor="warning"
              shape="square"
              fullWidth
              onClick={() => {}}
            >
              Warning
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ZetaButton
              startIcon={<User01Icon />}
              backgroundColor="danger"
              shape="square"
              fullWidth
              onClick={() => {}}
            >
              Danger
            </ZetaButton>
          </Grid>
        </Grid>
      </ZetaContainer>

      {/* test session call */}
      <ZetaButton
        backgroundColor="primary"
        shape="square"
        fullWidth
        onClick={async () => {
          // const res = await selfApiWorker.post("/api/auth/session");
          const res = await apiWorker.get("/auth/status");
          console.log(res.data);
        }}
      >
        test session call
      </ZetaButton>

      {/* <code>
        <pre>
          POSTS
          <br />
          {JSON.stringify(posts, null, 2)}
          <br />
        </pre>
      </code> */}
    </DefaultLayout>
  );
}
