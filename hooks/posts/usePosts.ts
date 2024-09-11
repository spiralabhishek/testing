'use client';
import useSWR from 'swr';
import { useClientApi } from '../../utils/clientApi';
import { BasePost } from '@/lib/types/post';

export function usePosts() {
    const clientApi = useClientApi();

    const fetchPosts = async () => {
        const response = await clientApi({
            endpoint: '/api/posts',
            requiresAuth: false
        });

        return response as BasePost[];
    };

    return useSWR<BasePost[]>('posts', fetchPosts);
}
