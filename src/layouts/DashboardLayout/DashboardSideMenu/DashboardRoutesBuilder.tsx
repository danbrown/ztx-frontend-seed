import { createRef } from "react";
import { useRouter } from "next/router";
import { Button, Box, Divider, Typography, Spacing } from "@wipsie/ui";
import MenuItem from "./SideMenuItem";
import MenuGroup from "./SideMenuGroup";
import { replaceSlug } from "@utils/replaceSlug";

export const DashboardRoutesBuilder = ({ routes }) => {
  const router = useRouter();
  const appSlug = router.query.appSlug as string;

  return (
    <>
      {routes.map((item: any, index) => {
        switch (item.type) {
          case "ITEM":
            return item.items ? (
              <MenuGroup
                key={item.label}
                ref={createRef()}
                label={item.label}
                link={replaceSlug(
                  item.link.split(window.location.host)[1] || item.link,
                  appSlug
                )}
                icon={item.icon}
                items={item.items.map((subItem: any) => {
                  return {
                    ...subItem,
                    link: replaceSlug(
                      subItem.link.split(window.location.host)[1] ||
                        subItem.link,
                      appSlug
                    ),
                  };
                })}
                current={replaceSlug(router.route, appSlug)}
              />
            ) : (
              <>
                <MenuItem
                  key={item.label}
                  label={item.label}
                  link={replaceSlug(item.link, appSlug)}
                  icon={item.icon}
                  active={
                    replaceSlug(router.route, appSlug) ===
                    replaceSlug(
                      item.link.split(window.location.host)[1] || item.link,
                      appSlug
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
