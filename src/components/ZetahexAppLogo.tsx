import { serviceLinks } from "@config/links";
import { responsive, useTheme } from "@wipsie/ui";
import { NextLink } from "./NextLink";

export const ZetahexAppLogo = ({ width = responsive(100, 200) }) => {
  const theme = useTheme();

  return (
    <NextLink href={`${serviceLinks.main}`} style={{ width }}>
      {theme.type === "dark" ? (
        <img src="/static/logo/white.svg" alt="Zetahex" title="Zetahex" />
      ) : (
        <img src="/static/logo/black.svg" alt="Zetahex" title="Zetahex" />
      )}
    </NextLink>
  );
};
