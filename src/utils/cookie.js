export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const value = c.substring(nameEQ.length, c.length);
      return value;
    }
  }
  return null;
};

export const deleteCookie = (name, path = "/") => {
  document.cookie = name + "=;Max-Age=-1;path=" + path + ";";
};

export const setCookie = (name, value, timeToLive, path = "/") => {
  document.cookie = `${name}=${value};Max-Age=${timeToLive};path=${path}`;
};
