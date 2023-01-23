import {
  Button,
  ButtonProps,
  Container,
  Divider,
  Flex,
  Grid,
  Input,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
import { User01Icon } from "@wipsie/icons";

export default function Home(props) {
  const theme = useTheme();

  const { addFish, fishes } = useZustandStore("fishes");
  const { posts } = useZustandSwr("posts", SWR_POSTS_KEY);

  return (
    <DefaultLayout>
      <NextLink href="/dois">Page Dois</NextLink>

      <Divider spacing={2} />

      <Container
        shape="square"
        p={6}
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: theme.palette.highlight,
          clipPath: "url(#cyberCard1H)",
          WebkitClipPath: "url(#cyberCard1H)",
        }}
      >
        <Typography variant="h1" color="neutral">
          Hello World
        </Typography>
        <Spacing height={1} />
        <Typography variant="h3" color="subtext">
          This is a subtitle
        </Typography>
        <Spacing height={1} />
        <Input
          shape="square"
          placeholder="Type something..."
          startAdornment={<User01Icon />}
          wrapperProps={{
            style: {
              clipPath: "url(#cyberButton1)",
              WebkitClipPath: "url(#cyberButton1)",
            },
          }}
        />
        <Divider spacing={2} />
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, voluptatem?
        </Typography>
        <Spacing height={2} />
        <Container
          display="flex"
          direction="row"
          shape="square"
          backgroundColor="highlight"
          style={{
            clipPath: "url(#cyberHeader2)",
            WebkitClipPath: "url(#cyberHeader2)",
          }}
        >
          <Typography variant="h4" color="neutral">
            Fishes:
          </Typography>
          <Spacing width={1} />
          <Typography variant="h4" color="subtext">
            {fishes}
          </Typography>
        </Container>
        <Spacing height={4} />
        <Grid container>
          <Grid item xs={12} sm={6} md={2}>
            <ZetaButton
              backgroundColor="neutral"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              neutral
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ZetaButton
              backgroundColor="success"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Success
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ZetaButton
              backgroundColor="info"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Info
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ZetaButton
              backgroundColor="warning"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Warning
            </ZetaButton>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ZetaButton
              startIcon={<User01Icon />}
              backgroundColor="danger"
              shape="square"
              fullWidth
              onClick={() => {
                addFish();
              }}
            >
              Danger
            </ZetaButton>
          </Grid>
        </Grid>
      </Container>

      <code>
        <pre>
          POSTS
          <br />
          {JSON.stringify(posts, null, 2)}
          <br />
        </pre>
      </code>

      <ZetaMaterials />
    </DefaultLayout>
  );
}

const ZetaMaterials = () => {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberButton1"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0.929,1 V0.906 H0.849 v0.094 H0.059 L0,0.767 V0 H1 V1" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberButton2"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="m0,0 v0.834 h0.259 l0.043,0.166 h0.699 V0 H0 m0.975,0.287 l-0.05,-0.192 h0.05 v0.192" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberCard1H"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0.763,0.923,0.544,0.923,0.493,1,0.452,1,0.411,1,0.275,1,0.275,0.923,0.258,0.923,0.258,1,0.214,1,0.214,0.923,0.198,0.923,0.198,1,0.153,1,0.153,0.923,0.137,0.923,0.137,1,0,1,0,0.888,0,0.873,0,0.1,0.066,0,0.934,0,1,0.1,1,0.888,1,0.888,0.926,1,0.881,1,0.844,1,0.814,1,0.814,1,0.763,0.923" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberHeader1"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0.044,0,0,0.213,0,0.441,0.043,0.441,0.043,0.495,0,0.495,0,0.58,0.043,0.58,0.043,0.633,0,0.633,0,0.718,0.043,0.718,0.043,0.771,0,0.771,0,1,0.112,1,0.112,0.803,0.888,0.803,0.888,1,1,1,1,0,0.044,0" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberHeader2"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0.29,0.38,0.227,0.002,0.217,0.002,0.217,0,0,0,0,1,0.15,1,0.217,1,1,1,1,0.38,0.29,0.38" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

const ZetaButton = ({
  children,
  skin = "button2",
  ref,
  ...props
}: ButtonProps & {
  skin?: "button1" | "button2" | "card1H" | "header1" | "header2";
}) => {
  let clipPath;
  switch (skin) {
    case "card1H":
      clipPath = "url(#cyberCard1H)";
      break;
    case "button2":
      clipPath = "url(#cyberButton2)";
      break;

    case "header1":
      clipPath = "url(#cyberHeader1)";
      break;

    case "header2":
      clipPath = "url(#cyberHeader2)";
      break;

    case "button1":
    default:
      clipPath = "url(#cyberButton1)";
      break;
  }

  return (
    <Button
      {...props}
      ref={ref && (ref as any)}
      style={{
        clipPath: clipPath,
        WebkitClipPath: clipPath,
        paddingBottom: "0.6rem",
      }}
    >
      {children}
    </Button>
  );
};
