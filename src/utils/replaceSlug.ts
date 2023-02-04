export function replaceSlug(link: string, value: string, slug = "[appSlug]") {
  return link ? link.replace(slug, value) : "";
}
