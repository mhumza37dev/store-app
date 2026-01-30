import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export function throwIfResNotOk(res: AxiosResponse) {
  if (res.status < 200 || res.status >= 300) {
    const text = res.data || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: data ? { 'Content-Type': 'application/json' } : {},
  };
  const res = await axios(config);
  throwIfResNotOk(res);
  return res;
}
