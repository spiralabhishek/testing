import { NextResponse } from 'next/server';
import { withRoles } from '@/lib/roleMiddleware';
import { auth } from '@clerk/nextjs/server';

// Define the handler function with the correct types
async function handleGetProfessionalData(req: Request, { params }: { params: { id: string } }): Promise<Response> {
    const { userId } = auth();

    if (userId !== params.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Logic to get professional data
    const professionalData = {}; // Replace with actual logic

    return NextResponse.json({ professionalData });
}

// Wrap the handler function with the role middleware
export const GET = withRoles(handleGetProfessionalData, ['professional', 'admin']);
