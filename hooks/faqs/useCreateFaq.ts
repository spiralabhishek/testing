'use client';
import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';
import { FAQ } from '@/lib/types/common';

export function useCreateFAQ() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const createFAQ = async (faqData: FAQ): Promise<FAQ> => {
        const newFAQ: FAQ = await clientApi({
            endpoint: '/api/users/faqs',
            method: 'POST',
            data: faqData,
            requiresAuth: true,
        });

        mutate('faqs', (faqs: FAQ[] = []) => [...faqs, newFAQ], false);

        return newFAQ;
    };

    return createFAQ;
}
