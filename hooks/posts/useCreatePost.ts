'use client'
import { useSWRConfig } from 'swr';
import { useClientApi } from '../../utils/clientApi';
import { BasePost } from '@/lib/types/post';

export function useCreatePost<T extends BasePost>() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const createPost = async (postData: T): Promise<T> => {
        const newPost: T = await clientApi({
            endpoint: '/api/posts',
            method: 'POST',
            data: postData,
            requiresAuth: true,
        });
        mutate(
            'posts',
            (posts: T[] = []) => [...posts, newPost],
            false
        );

        return newPost;
    };

    return createPost;
}
