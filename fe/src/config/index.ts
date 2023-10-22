export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_CLIENT_URL_PROD
    : import.meta.env.VITE_CLIENT_URL_DEV;
