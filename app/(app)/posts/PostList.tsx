
'use client'
import { usePosts } from "@/hooks/posts/usePosts";

export default function PostList({ initialData }: any) {
    const { error, isLoading } = usePosts();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(initialData?.data);

    return (
        <ul>
            {initialData?.data?.posts && initialData?.data?.posts.map((post: any) => <li className="text-black" key={post._id}>{post.title}</li>)}
        </ul>
    );
}
