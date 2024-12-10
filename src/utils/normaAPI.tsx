import { BASE_URL } from "./Constants";
import { checkReponse } from "./checkresponse";
import { setCookie, getCookie } from "./cookie";
import {
  IdList,
  TLoginData,
  TOrder,
  TorderByID,
  TRefreshResponse,
  TAuthResponse,
  TRegisterData,
  TOrderResponse,
  TServerResponse,
  TIngredientsResponse,
  TUserResponse,
} from "./Types";

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then((res) => checkReponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      return refreshData;
    });

export const logoutRequest = () =>
  fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkReponse<TServerResponse<{}>>(res));

export const loginRequest = (data: TLoginData) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkReponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const updateUserRequest = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken"),
    } as HeadersInit,
    body: JSON.stringify(user),
  });

export async function fetchWithRefresh<T>(
  url: RequestInfo,
  options: RequestInit,
) {
  try {
    const res = await fetch(url, options);
    return await checkReponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkReponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
}
export const getUserRequest = () =>
  fetchWithRefresh<TUserResponse>(`${BASE_URL}/auth/user`, {
    headers: {
      authorization: getCookie("accessToken"),
    } as HeadersInit,
  });
export const registerUserRequest = (data: TRegisterData) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkReponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const forgotPasswordRequest = (data: { email: string }) =>
  fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkReponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const resetPasswordRequest = (data: {
  password: string;
  token: string;
}) =>
  fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkReponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export function getIngredientsRequest() {
  return fetch(`${BASE_URL}/ingredients`).then(
    checkReponse<TIngredientsResponse>,
  );
}
export function orderRequest(ingredients: IdList) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      authorization: getCookie("accessToken"),
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then(checkReponse<TOrderResponse>);
}
export function RegisterRequest(data: TRegisterData) {
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkReponse<TAuthResponse>(res))
    .then((res) => {
      if (res?.success) return res;
      return Promise.reject(res);
    });
}
type TRequest = {
  url: string;
  options?: RequestInit;
};

export async function request<T>({ url, options }: TRequest): Promise<T> {
  const res = await fetch(url, options);
  return checkReponse(res);
}
export function OrderByIDRequest(number: string): Promise<TorderByID> {
  return request({
    url: `${BASE_URL}/orders/${number}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
}
