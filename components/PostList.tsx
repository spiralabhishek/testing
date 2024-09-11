'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PostList({ posts }: { posts: any[] }) {
    const [postList, setPostList] = useState(posts);
    const router = useRouter();

    const handleDelete = async (postId: string) => {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/posts?id=${postId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setPostList(postList.filter(post => post._id !== postId));
            } else {
                const errorData = await res.json();
                alert(`Failed to delete post: ${errorData.error}`);
            }
        } catch (error) {
            console.error('An error occurred while deleting the post:', error);
            alert('An error occurred while deleting the post.');
        }
    };

    return (
        <ul className="flex flex-wrap justify-center">
            {postList.map((post) => (
                <li
                    key={post._id}
                    className="bg-white shadow-md rounded-lg p-4 m-4 w-64 text-center"
                >
                    <Link href={`/posts/${post._id}`}>
                        <div className="text-lg font-bold text-black">{post.title}</div>
                    </Link>
                    <button
                        type='button'
                        className='px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        onClick={() => router.push(`/posts/edit/${post._id}`)}
                    >
                        Edit
                    </button>
                    <button
                        type='button'
                        onClick={() => handleDelete(post._id)}
                        className='px-3 py-2 mx-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
