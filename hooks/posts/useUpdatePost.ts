'use client';
import { BasePost } from '@/lib/types/post';
import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';

export function useUpdatePost<T extends BasePost>() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const updatePost = async (postId: string, updatedData: Partial<T>): Promise<T> => {
        const updatedPost = await clientApi({
            endpoint: `/posts/${postId}`,
            method: 'PUT',
            data: updatedData,
            requiresAuth: true,
        }) as T;
 
        mutate('posts', (posts: T[] = []) => 
            posts.map(post => 
                post._id.toString() === postId ? { ...post, ...updatedPost } : post
            ), 
            false
        );

        return updatedPost;
    };

    return updatePost;
}
