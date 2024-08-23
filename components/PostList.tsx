'use client';

import Link from 'next/link';

export default function PostList({ posts }: { posts: any[] }) {
    return (
        <ul className="flex flex-wrap justify-center">
            {posts.map((post) => (
                <li
                    key={post._id}
                    className="bg-white shadow-md rounded-lg p-4 m-4 w-64 text-center"
                >
                    <Link href={`/posts/${post._id}`}>
                        <div className="text-lg font-bold text-black">{post.title}</div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
