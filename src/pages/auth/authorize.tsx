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
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore, useZustandSwr } from "@zustand/ZustandStoreProvider";
import { SWR_POSTS_KEY } from "@zustand/slices/posts.slice";
import { User01Icon } from "@wipsie/icons";

export default function Home(props) {
  const theme = useTheme();


  return <DefaultLayout></DefaultLayout>;
}
