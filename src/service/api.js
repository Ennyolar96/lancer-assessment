import axios from "axios";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (error, currentRetry) => {
  if (currentRetry >= MAX_RETRIES) return false;

  if (error.code === "ECONNABORTED" || !error.response) return true;

  const status = error.response?.status;
  return !!(status && (status >= 500 || status === 429));
};

export function createHttpClient(
  baseURL = import.meta.env.VITE_API_URL,
) {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  /**
   * Retry interceptor
   */
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      if (!config) throw error;

      config.__retryCount = config.__retryCount || 0;

      if (shouldRetry(error, config.__retryCount)) {
        config.__retryCount += 1;
        await delay(RETRY_DELAY * config.__retryCount);
        return instance(config);
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

export const http = createHttpClient();
