import { throwIfResNotOk } from '@/api/base';
import axios from 'axios';
import { QueryClient, type QueryFunction } from '@tanstack/react-query';

type UnauthorizedBehavior = 'returnNull' | 'throw';

export const getQueryFn: <T>(options: { on401: UnauthorizedBehavior }) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await axios.get(queryKey.join('/') as string);

    if (unauthorizedBehavior === 'returnNull' && res.status === 401) {
      return null;
    }

    throwIfResNotOk(res);
    return res.data;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: 'throw' }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
