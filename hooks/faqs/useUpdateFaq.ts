'use client';
import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';
import { FAQ } from '@/lib/types/common';

export function useUpdateFAQ() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const updateFAQ = async (faqId: string, updatedData: Partial<FAQ>): Promise<FAQ> => {
        const updatedFAQ = await clientApi({
            endpoint: `/api/faqs/${faqId}`,
            method: 'PUT',
            data: updatedData,
            requiresAuth: true,
        }) as FAQ;

        mutate('faqs', (faqs: FAQ[] = []) =>
            faqs.map(faq =>
                faq._id.toString() === faqId ? { ...faq, ...updatedFAQ } : faq
            ), false
        );

        return updatedFAQ;
    };

    return updateFAQ;
}
