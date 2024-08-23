'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BasePost } from '@/lib/types/post';

export default function PostDetailPage({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<BasePost>();
    const router = useRouter();

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`/api/posts?_id=${params.id}`);
            const data = await res.json();
            if (!res.ok) {
                router.push('/posts');
            } else {
                setPost(data?.data?.posts[0]);
            }
        }

        fetchPost();
    }, [params.id, router]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-semibold text-black">{post?.title}</h1>
            </div>
        </div>
    );
}
