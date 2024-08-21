// app/dashboard/page.tsx
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await currentUser();
    const userRole = user?.publicMetadata.role as string;

    if (!['professional', 'admin'].includes(userRole)) {
        return <div>Unauthorized: You do not have access to this page.</div>;
    }

    // Dashboard content based on role
    return (
        <div>
            <h1>Dashboard</h1>
            {userRole === 'admin' && <div>Admin-specific content</div>}
            {userRole === 'professional' && <div>Professional-specific content</div>}
        </div>
    );
}
