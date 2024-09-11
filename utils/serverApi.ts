// utils/serverApi.ts
import { ApiConfig } from '@/lib/types/api';
import { auth } from '@clerk/nextjs';

export async function serverApi<T>({
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
    const { getToken } = auth();
    const token = await getToken();
    if (!token) throw new Error('No token available');

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    };
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const errorBody = await res.text();
    console.error('API request failed:', {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`API request failed with status ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
