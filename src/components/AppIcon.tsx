import { serviceLinks } from "@config/links";
import { responsive, useTheme } from "@wipsie/ui";
import { NextLink } from "./NextLink";

export const AppIcon = ({ width = responsive(100, 200) }) => {
  const theme = useTheme();

  return (
    <NextLink href={`${serviceLinks.main}`} style={{ width }}>
      {theme.type === "dark" ? "appIcon-dark" : "appIcon-light"}
    </NextLink>
  );
};
