import { useClientApi } from '@/utils/clientApi';
import { useSWRConfig } from 'swr';

export function useDeletePost<T extends { _id: string }>() {
    const clientApi = useClientApi();
    const { mutate } = useSWRConfig();

    const deletePost = async (postId: string): Promise<void> => {
        await clientApi({
            endpoint: `/api/posts/${postId}`,
            method: 'DELETE',
            requiresAuth: true,
        });

        mutate('posts', async (posts: T[] = []) =>
            posts.filter(post => post._id !== postId), false);
    };

    return deletePost;
}
