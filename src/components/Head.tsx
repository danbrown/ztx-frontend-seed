import { default as NextHead } from "next/head";
import { useTheme } from "@wipsie/ui";
import * as config from "../config";

export interface HeadProps {
  title?: string;
  useTitlePrefix?: boolean;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
}

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  image,
  url,
  keywords,
  useTitlePrefix = true,
}) => {
  const theme = useTheme();

  const pageTitle = title
    ? title + (useTitlePrefix ? ` | ${config.SITE_TITLE}` : "")
    : config.SITE_TITLE;

  return (
    <NextHead key="head">
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} key="title" />
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      {image && (
        <meta
          property="og:image"
          content={
            image.startsWith("https://") ? image : `${config.SITE_URL}${image}`
          }
        />
      )}
      <meta property="og:title" content={pageTitle} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:keywords" content={keywords} />
      <meta name="keywords" content={keywords} />
      <meta
        name="msapplication-TileColor"
        content={theme.palette.primary[500]}
      />
      <meta name="theme-color" content={theme.palette.primary[500]} />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />

      <link rel="icon" type="image/png" href="/favicon.png" />
    </NextHead>
  );
};
