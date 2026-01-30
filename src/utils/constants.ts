export const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('VITE_BASE_URL is not defined in environment variables');
}

export const API_ENDPOINT = {
  LOGIN: `${BASE_URL}/auth/login`,
  PROFILE: `${BASE_URL}/auth/me`,
  PRODUCTS: `${BASE_URL}/products`,
  PRODUCTS_SEARCH: `${BASE_URL}/products/search`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,
} as const;

export const QUERY_KEYS = {
  PROFILE: 'profile',
  PRODUCT: 'product',
  PRODUCTS: 'products',
  PRODUCTS_FOR_CHARTS: 'products-chart',
} as const;
