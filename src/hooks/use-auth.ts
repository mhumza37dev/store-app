import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';
import type { DummyUser } from '@/types/dummy-user';
import type { LoginCredentials, LoginResponse } from '@/types/login-types';
import { API_ENDPOINT, QUERY_KEYS } from '@/utils/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import React from 'react';

// --- Token Refresh Logic ---
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function refreshTokenRequest(refreshToken: string | null) {
  const res = await fetch(API_ENDPOINT.REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken, expiresInMins: 60 }),
  });
  if (!res.ok) throw new Error('Failed to refresh token');
  return res.json();
}

export function useRefreshToken() {
  const setAuth = useAuthStore();
  return async () => {
    const refreshToken = setAuth.user?.refreshToken;
    const data = await refreshTokenRequest(refreshToken || null);
    // DummyJSON returns { accessToken, refreshToken, ...user }
    setAuth.login(data, data.accessToken || data.token);
    return data.accessToken || data.token;
  };
}

// --- Axios Interceptor for Token Refresh ---
let interceptorAttached = false;
export function useAuthInterceptor() {
  const { token, user, logout } = useAuthStore();
  const refresh = useRefreshToken();

  React.useEffect(() => {
    if (interceptorAttached) return;
    interceptorAttached = true;

    const instance = axios;
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve) => {
              subscribeTokenRefresh((newToken) => {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                resolve(instance(originalRequest));
              });
            });
          }
          originalRequest._retry = true;
          isRefreshing = true;
          try {
            const newToken = await refresh();
            onRefreshed(newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
        return Promise.reject(error);
      },
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
      interceptorAttached = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);
}

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const [, setLocation] = useLocation();
  useAuthInterceptor();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const res = await axios.post(API_ENDPOINT.LOGIN, credentials);
        return res.data as LoginResponse;
      } catch (error: any) {
        const err_msg = error.response?.data?.message || error?.message || 'Login failed';
        throw new Error(err_msg);
      }
    },
    onSuccess: (data) => {
      // DummyJSON returns the user object spread with token
      const { token, ...user } = data;
      // DummyJSON might return 'accessToken' or 'token'
      const activeToken = token || data.accessToken;

      login(user as DummyUser, activeToken);
      setLocation('/dashboard');
    },
  });
}

export function useProfile() {
  const token = useAuthStore((state) => state.token);
  useAuthInterceptor();

  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE, token],
    queryFn: async () => {
      if (!token) throw new Error('No token');
      try {
        const res = await axios.get(API_ENDPOINT.PROFILE, {
          // withCredentials: true,
        });
        return res.data as DummyUser;
      } catch (error: any) {
        const err_msg =
          error.response?.data?.message || error?.message || 'Failed to fetch profile';
        throw new Error(err_msg);
      }
    },
    enabled: !!token,
  });
}
