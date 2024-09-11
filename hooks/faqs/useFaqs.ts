'use client';
import useSWR from 'swr';
import { useClientApi } from '@/utils/clientApi';
import { FAQ } from '@/lib/types/common';

export function useFAQs() {
    const clientApi = useClientApi();

    const fetchFAQs = async () => {
        const response = await clientApi({
            endpoint: '/api/users/faqs',
            requiresAuth: true,
        });
        return response as FAQ[];
    };

    return useSWR<FAQ[]>('faqs', fetchFAQs);
}
