'use client';
import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';
import { FAQ } from '@/lib/types/common';

export function useDeleteFAQ() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const deleteFAQ = async (faqId: string): Promise<void> => {
        await clientApi({
            endpoint: `/api/faqs/${faqId}`,
            method: 'DELETE',
            requiresAuth: true,
        });

        mutate('faqs', (faqs: FAQ[] = []) =>
            faqs.filter(faq => faq._id !== faqId), false);
    };

    return deleteFAQ;
}
