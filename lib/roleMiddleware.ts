// lib/roleMiddleware.ts
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define the withRoles middleware to handle the role-checking logic
export function withRoles(
  handler: (req: Request, context: { params: { id: string } }) => Promise<Response>,
  allowedRoles: string[]
) {
  return async (req: Request, context: { params: { id: string } }) => {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const userRole = user.publicMetadata.role as string;

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Pass the req and context to the handler
    return handler(req, context);
  };
}
