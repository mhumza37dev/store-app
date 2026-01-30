import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { Product, ProductResponse } from '@/types/product-types';
import { API_ENDPOINT, QUERY_KEYS } from '@/utils/constants';

export function useProducts(limit = 10, skip = 0, search = '') {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, limit, skip, search],
    queryFn: async () => {
      if (search) {
        const res = await axios.get(API_ENDPOINT.PRODUCTS_SEARCH, {
          params: { q: search, limit, skip },
        });
        return res.data as ProductResponse;
      }
      const res = await axios.get(API_ENDPOINT.PRODUCTS, {
        params: { limit, skip },
      });
      return res.data as ProductResponse;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      const res = await axios.get(`${API_ENDPOINT.PRODUCTS}/${id}`);
      return res.data as Product;
    },
    enabled: !!id,
  });
}

export function useAllProductsForChart() {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_FOR_CHARTS],
    queryFn: async () => {
      const res = await axios.get(API_ENDPOINT.PRODUCTS, {
        params: { limit: 10 },
      });
      return res.data as ProductResponse;
    },
  });
}
