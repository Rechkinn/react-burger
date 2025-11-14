import { BASE_URL, EMethod } from "./consts";

type TMethod =
  | EMethod.GET
  | EMethod.POST
  | EMethod.PUT
  | EMethod.PATCH
  | EMethod.DELETE;

type TOptions = {
  method: TMethod;
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
  body?: string;
};

function checkResponse(response: Response): Promise<any> | Promise<never> {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

export async function doRequest(
  endPoint: string,
  options?: TOptions
): Promise<any> {
  return fetch(`${BASE_URL}${endPoint}`, options).then(checkResponse);
}
