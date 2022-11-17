import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cacheStorage } from "../core/infra/cache-storage";

type AxiosOriginalConfig = AxiosRequestConfig & {
  sent?: boolean;
};

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL,
});

export const authorizedApi = axios.create({
  baseURL,
});

let authTokenRequest: Promise<any> | null;

function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = authorizedApi.post("/refresh", {
      refreshToken: cacheStorage.get("refreshToken"),
    });
    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

axios.defaults.withCredentials = true;
authorizedApi.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    if (!config?.headers) return;
    if (!config.headers?.Authorization) {
      config.headers!.Authorization = `Bearer ${cacheStorage.get("token")}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authorizedApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    if (!error.config) return;

    const originalConfig: AxiosOriginalConfig = error.config;
    originalConfig!.headers = { ...originalConfig!.headers };
    if (error?.response?.status === 401 && originalConfig && !originalConfig?.sent) {
      return getAuthToken().then((response) => {
        originalConfig!.sent = true;
        cacheStorage.set("token", response?.data?.token);
        cacheStorage.set("refreshToken", response?.data?.refreshToken);
        originalConfig.headers!.Authorization = `Bearer ${response?.data?.token}`;
        return authorizedApi(originalConfig);
      });
    }
    return Promise.reject(error);
  }
);
