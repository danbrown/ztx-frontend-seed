import { createRef } from "react";
import { useRouter } from "next/router";
import { Button, Box, Divider, Typography, Spacing } from "@wipsie/ui";
import MenuItem from "./SideMenuItem";
import MenuGroup from "./SideMenuGroup";
import { replaceSlug } from "@utils/replaceSlug";

export const DashboardRoutesBuilder = ({ routes }) => {
  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;

  return (
    <>
      {routes.map((item: any, index) => {
        switch (item.type) {
          case "ITEM":
            return item.items ? (
              <MenuGroup
                ref={createRef()}
                label={item.label}
                link={replaceSlug(
                  item.link.split(window.location.host)[1] || item.link,
                  projectSlug
                )}
                icon={item.icon}
                items={item.items.map((subItem: any) => {
                  return {
                    ...subItem,
                    link: replaceSlug(
                      subItem.link.split(window.location.host)[1] ||
                        subItem.link,
                      projectSlug
                    ),
                  };
                })}
                current={replaceSlug(router.route, projectSlug)}
              />
            ) : (
              <>
                <MenuItem
                  label={item.label}
                  link={replaceSlug(item.link, projectSlug)}
                  icon={item.icon}
                  active={
                    replaceSlug(router.route, projectSlug) ===
                    replaceSlug(
                      item.link.split(window.location.host)[1] || item.link,
                      projectSlug
                    )
                  }
                  external={!!item.external}
                />
              </>
            );

          case "TITLE":
            return (
              <Box
                p={2.4}
                pt={3}
                display="flex"
                fullWidth
                direction="row"
                align="center"
                justify="between"
              >
                <Typography variant="h4" component="div">
                  {item.label}
                </Typography>
                {item.badge && (
                  <>
                    <Spacing width={1} />
                    <Button
                      chip
                      label={item.badge.label}
                      size="mini"
                      backgroundColor={item.badge.color || "primary"}
                      variant={item.badge.variant || "outlined"}
                    />
                  </>
                )}
              </Box>
            );

          case "DIVIDER":
            return <Divider spacing={item.spacing}>{item.label}</Divider>;

          case "SPACING":
            return <Spacing height={item.height} />;
        }

        return null;
      })}
    </>
  );
};
