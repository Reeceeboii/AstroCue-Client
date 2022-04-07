import { AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import LocalStorageKeys from './Constants/LocalStorageKeys';
import Axios from 'axios';

/** Axios configuration object */
const axiosConfiguration = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 20000,
};

const instance = Axios.create(axiosConfiguration);
instance.interceptors.request.use((config: AxiosRequestConfig) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${
      typeof window !== 'undefined' &&
      localStorage.getItem(LocalStorageKeys.Token)
    }`,
  },
}));

configure({ axios: instance });
