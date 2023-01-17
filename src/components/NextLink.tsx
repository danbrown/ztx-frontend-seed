import Link, { LinkProps } from "next/link";
import { Link as WipsieLink, LinkProps as WipsieLinkProps } from "@wipsie/ui";

export const NextLink: React.FC<LinkProps | WipsieLinkProps> = (
  props: React.PropsWithChildren<LinkProps>
) => (
  <WipsieLink {...(props as WipsieLinkProps)} component={Link}>
    {props.children}
  </WipsieLink>
);
