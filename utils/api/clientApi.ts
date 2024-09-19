    'use client'

import { useAuth } from '@clerk/nextjs';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiRequestConfig {
  endpoint: string;
  method: HttpMethod;
  data?: any;
  requiresAuth: boolean;
}


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function clientApiRequest<T>({
  endpoint,
  method,
  data,
  requiresAuth
}: ApiRequestConfig): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  if (requiresAuth) {
    const { getToken } = useAuth();
    const token = await getToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred while fetching data');
  }

  return response.json();
}