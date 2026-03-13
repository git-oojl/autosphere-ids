import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  // TODO: attach auth token from auth store when backend auth is ready.
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: centralize 401/403 handling once auth flow is implemented.
    return Promise.reject(error);
  }
);

export default http;
