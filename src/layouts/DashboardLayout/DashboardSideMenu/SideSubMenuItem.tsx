import { NextLink } from "@components/NextLink";
import { Button, responsive, useTheme } from "@wipsie/ui";

import isCurrentPath from "./isCurrentPath";

const SubMenuitem = ({ key, label, link, icon, current, external }) => {
  const theme = useTheme();
  return (
    <NextLink
      key={key}
      href={link}
      target={link.startsWith("http") || external ? "_blank" : undefined}
      rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{ width: "100%" }}
    >
      <a style={{ width: "100%" }}>
        <Button
          size="medium"
          fullWidth
          shape="square"
          align="left"
          variant="ghost"
          color={
            link && isCurrentPath(link, current)
              ? theme.palette.text
              : theme.palette.subtext
          }
          style={{
            fontWeight: 500,
            marginBottom: -1,
            textTransform: "capitalize",
            paddingLeft: 35,
            paddingRight: 35,
            fontSize: responsive(12, 14),
            borderRight:
              link && isCurrentPath(link, current)
                ? `4px solid ${theme.palette.primary[500]}`
                : "",
          }}
        >
          <span>
            <span
              style={{
                paddingRight: 10,
                color:
                  link && isCurrentPath(link, current)
                    ? theme.palette.primary[500]
                    : theme.palette.subtext,
              }}
            >
              {icon}
            </span>
            {label}
          </span>
        </Button>
      </a>
    </NextLink>
  );
};

export default SubMenuitem;
