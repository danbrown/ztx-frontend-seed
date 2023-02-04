export const decodeJwt = (
  token: string
): {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
} => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
};
