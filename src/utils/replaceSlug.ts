export function replaceSlug(
  link: string,
  value: string,
  slug = "[projectSlug]"
) {
  return link ? link.replace(slug, value) : "";
}
