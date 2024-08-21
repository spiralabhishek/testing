// components/Navigation.tsx
'use client';

import Link from 'next/link';
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navigation() {
    const { isSignedIn } = useUser();

    return (
        <nav>
            <Link href="/">Home</Link>
            {isSignedIn ? (
                <>
                    <Link href="/dashboard">Dashboard</Link>
                    <UserButton afterSignOutUrl="/" />
                </>
            ) : (
                <SignInButton />
            )}
        </nav>
    );
}
