import slugify from "slugify";

export function generateSlug(value: string): string {
  return slugify(value, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()&'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
  });
}
