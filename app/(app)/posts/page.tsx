
import { serverApi } from '@/utils/serverApi';
import PostList from './PostList';

export default async function PostsPage() {
    const initialPosts = await serverApi({ endpoint: '/api/posts', requiresAuth: true })
    return <PostList initialData={initialPosts} />;
}
