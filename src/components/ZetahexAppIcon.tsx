import { serviceLinks } from "@config/links";
import { responsive, useTheme } from "@wipsie/ui";
import { NextLink } from "./NextLink";

export const ZetahexAppIcon = ({ width = responsive(100, 200) }) => {
  const theme = useTheme();

  return (
    <NextLink href={`${serviceLinks.main}`} style={{ width }}>
      {theme.type === "dark" ? (
        <img src="/static/logo/icon-white.svg" alt="Zetahex" title="Zetahex" />
      ) : (
        <img src="/static/logo/icon-black.svg" alt="Zetahex" title="Zetahex" />
      )}
    </NextLink>
  );
};
