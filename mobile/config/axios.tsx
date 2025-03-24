import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const onRequest = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  const router = useRouter();
  if (typeof window === "undefined") return config;
  // const authorization = SecureStore.getItemAsync("accessToken") || "";
  // if (!authorization) {
  //   router.push("/(auths)/signin");
  // // }
  // config.headers.Authorization = `Bearer ${authorization}`;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
export const baseUrl = isProduction
  ? (process.env.NEXT_PUBLIC_API_BASE_URL as string)
  : "http://localhost:9000/";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

setupInterceptorsTo(axiosInstance);
