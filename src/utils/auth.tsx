import Cookies from "js-cookie";

const isProd = process.env.NODE_ENV === "production";

// token在Cookie中key的名稱
export const TokenKey = "React18Template";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token, {
    sameSite: "strict",
    secure: isProd ? true : false,
  });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
