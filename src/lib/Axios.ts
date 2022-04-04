import axios from 'axios';

/** Axios configuration object */
const axiosConfiguration = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 20000,
};

export const axiosInstance = axios.create(axiosConfiguration);
