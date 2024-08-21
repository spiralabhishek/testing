// lib/roleMiddleware.ts
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function withRoles(handler: Function, allowedRoles: string[]) {
    return async (req: Request) => {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await clerkClient.users.getUser(userId);
        const userRole = user.publicMetadata.role as string;

        if (!allowedRoles.includes(userRole)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return handler(req);
    };
}
