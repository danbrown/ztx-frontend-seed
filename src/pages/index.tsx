import {
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  Divider,
  Flex,
  Grid,
  Input,
  InputProps,
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
            {fishes}
          </Typography>
        </ZetaHeader2>

        <Spacing height={4} />

        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
      </ZetaContainer>

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
            <path d="M0.949,0,0.949,0,0.82,0,0.587,0,0.408,0,0.119,0,0.046,0,0,0.066,0,0.934,0.046,1,0.119,1,0.401,1,0.408,1,0.459,1,0.587,1,0.82,1,0.942,1,0.949,1,1,1,1,0.863,0.979,0.863,0.979,0.847,1,0.847,1,0.802,0.979,0.802,0.979,0.786,1,0.786,1,0.742,0.979,0.742,0.979,0.725,1,0.725,1,0.589,1,0.548,1,0.507,0.979,0.478,0.979,0.215,1,0.186,1,0.186,1,0.156,1,0.119,1,0.074,0.949,0" />
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
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberIconButton"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M1,0.175,1,0,0.439,0,0.335,0.098,0,0.098,0,0.846,0.163,1,0.887,1,0.955,1,1,1,1,0.889,1,0.85,1,0.827,0.955,0.784,0.955,0.218,1,0.175" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberSideButtonLarge"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0.761,0,0.616,0,0.459,0,0.31,0,0.075,0,0,0.228,0,0.824,0.191,0.824,0.31,0.824,0.332,0.824,0.459,0.824,0.541,0.824,0.761,0.824,0.873,0.824,0.931,1,1,1,1,0.824,1,0.814,1,0,0.761,0" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="cyberSideButtonSmall"
            fill="#FFFFFF"
            stroke="#000000"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0.164,0,0,0.228,0,0.824,0.724,0.824,0.85,1,1,1,1,0.824,1,0.814,1,0,0.164,0" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

const ZetaButton = ({ children, style = {}, ref, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      ref={ref && (ref as any)}
      style={{
        ...style,
        clipPath: "url(#cyberButton2)",
        WebkitClipPath: "url(#cyberButton2)",
        paddingBottom: "0.65rem",
      }}
    >
      {children}
    </Button>
  );
};

const ZetaContainer = ({
  children,
  style = {},
  ref,
  ...props
}: ContainerProps) => {
  return (
    <Container
      {...props}
      ref={ref && (ref as any)}
      style={{
        ...style,
        clipPath: "url(#cyberCard1H)",
        WebkitClipPath: "url(#cyberCard1H)",
      }}
    >
      {children}
    </Container>
  );
};

const ZetaHeader1 = ({
  children,
  style = {},
  ref,
  ...props
}: ContainerProps) => {
  return (
    <Container
      {...props}
      ref={ref && (ref as any)}
      style={{
        ...style,
        clipPath: "url(#cyberHeader1)",
        WebkitClipPath: "url(#cyberHeader1)",
      }}
    >
      {children}
    </Container>
  );
};

const ZetaHeader2 = ({
  children,
  style = {},
  ref,
  ...props
}: ContainerProps) => {
  return (
    <Container
      {...props}
      ref={ref && (ref as any)}
      style={{
        ...style,
        clipPath: "url(#cyberHeader2)",
        WebkitClipPath: "url(#cyberHeader2)",
      }}
    >
      {children}
    </Container>
  );
};

const ZetaInput = ({
  children,
  wrapperProps = {},
  ref,
  ...props
}: InputProps) => {
  return (
    <Input
      {...props}
      ref={ref && (ref as any)}
      wrapperProps={{
        ...wrapperProps,
        style: {
          ...wrapperProps?.style,
          clipPath: "url(#cyberButton1)",
          WebkitClipPath: "url(#cyberButton1)",
        },
      }}
    >
      {children}
    </Input>
  );
};
