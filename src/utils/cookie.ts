export const getCookie = (name: string): string | null => {
  const nameEQ: string = name + "=";
  const arrayCookie: string[] = document.cookie.split(";");
  for (let i = 0; i < arrayCookie.length; i++) {
    let cookie: string = arrayCookie[i];
    while (cookie.charAt(0) === " ")
      cookie = cookie.substring(1, cookie.length);
    if (cookie.indexOf(nameEQ) === 0) {
      const value: string = cookie.substring(nameEQ.length, cookie.length);
      return value;
    }
  }
  return null;
};

export const deleteCookie = (name: string, path: string = "/"): void => {
  document.cookie = name + "=;Max-Age=-1;path=" + path + ";";
};

export const setCookie = (
  name: string,
  value: string,
  timeToLive: number,
  path: string = "/"
): void => {
  document.cookie = `${name}=${value};Max-Age=${timeToLive};path=${path}`;
};
