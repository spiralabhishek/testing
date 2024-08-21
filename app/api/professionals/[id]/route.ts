// app/api/professionals/[id]/route.ts
import { NextResponse } from 'next/server';
import { withRoles } from '@/lib/roleMiddleware';
import { auth } from '@clerk/nextjs/server';

async function handleGetProfessionalData(req: Request, { params }: { params: { id: string } }) {
    const { userId } = auth();
    if (userId !== params.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Logic to get professional data
    return NextResponse.json({ professionalData: {} });
}

export const GET = withRoles(handleGetProfessionalData, ['professional', 'admin']);
