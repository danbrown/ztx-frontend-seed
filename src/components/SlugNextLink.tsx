import { LinkProps } from "next/link";
import { LinkProps as WipsieLinkProps } from "@wipsie/ui";
import { useRouter } from "next/router";
import { NextLink } from "./NextLink";
import { replaceSlug } from "@utils/replaceSlug";

type SlugNextLinkType = (LinkProps | WipsieLinkProps) & {
  slug?: string;
  value?: string | number;
};

export const SlugNextLink: React.FC<SlugNextLinkType> = (
  props: React.PropsWithChildren<SlugNextLinkType>
) => {
  const router = useRouter();
  const {
    children,
    href,
    slug = "[appSlug]",
    value = router.query.appSlug,
    ...otherProps
  } = props;
  return (
    <NextLink
      href={replaceSlug(href as string, value as string, slug)}
      {...otherProps}
    >
      {children}
    </NextLink>
  );
};
