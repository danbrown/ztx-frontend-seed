import { serviceLinks } from "@config/links";
import { responsive, useTheme } from "@wipsie/ui";
import { NextLink } from "./NextLink";

export const AppLogo = ({ width = responsive(100, 200) }) => {
  const theme = useTheme();

  return (
    <NextLink href={`${serviceLinks.main}`}>
      {theme.type === "dark" ? "appLogo-dark" : "appLogo-light"}
    </NextLink>
  );
};
