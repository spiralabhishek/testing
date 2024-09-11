'use client'
import { ApiConfig } from '@/lib/types/api';
import { useAuth } from '@clerk/nextjs';

export function useClientApi() {
  const { getToken } = useAuth();

  return async function clientApi<T>({ 
    endpoint, 
    method = 'GET', 
    data, 
    requiresAuth 
  }: ApiConfig): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const options: RequestInit = { method };

    if (data) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(data);
    }

    if (requiresAuth) {
      const token = await getToken();
      options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
    }

    const res = await fetch(url, options);
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  };
}