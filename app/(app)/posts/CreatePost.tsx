'use client'
import { useState } from 'react';

export default function CreatePost() {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Create Post</button>
        </form>
    );
}
