'use client';

import PostList from '@/components/PostList';
import { useEffect, useState } from 'react';

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data?.data?.posts || []);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {loading ? <p>Loading...</p> : <PostList posts={posts} />}
        </div>
    );
}
