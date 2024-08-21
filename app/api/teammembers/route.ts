import { NextRequest, NextResponse } from 'next/server';
import {
    createTeamMember,
    getTeamMemberById,
    getAllTeamMembers,
    updateTeamMember,
    deleteTeamMember,
} from './repository';
import dbConnect from '@/lib/mongodb';
import { getTeamMembers } from './services';
import { createApiResponse } from '@/lib/types/api';

await dbConnect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const teamMember = await createTeamMember(body);
        return NextResponse.json(teamMember, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    const params: Record<string, string> = Object.fromEntries(
      req.nextUrl.searchParams.entries()
    );
    try {
      const filters = await getTeamMembers(params);
      const response = createApiResponse(true, filters);
      return NextResponse.json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const response = createApiResponse(false, error.message);
        return NextResponse.json(response, { status: 400 });
      }
      const response = createApiResponse(false, "Unknown error occurred");
      return NextResponse.json(response, { status: 400 });
    }
  }

// export async function GET(req: NextRequest) {
//     const id = req.nextUrl.searchParams.get('id');
//     try {
//         if (id) {
//             const teamMember = await getTeamMemberById(id as string);
//             if (!teamMember) {
//                 return NextResponse.json({ error: 'Team Member not found' }, { status: 404 });
//             }
//             return NextResponse.json(teamMember);
//         } else {
//             const teamMembers = await getAllTeamMembers();
//             return NextResponse.json(teamMembers);
//         }
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 400 });
//         }
//         return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
//     }
// }

export async function PUT(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    try {
        const body = await req.json();
        const teamMember = await updateTeamMember(id as string, body);
        if (!teamMember) {
            return NextResponse.json({ error: 'Team Member not found' }, { status: 404 });
        }
        return NextResponse.json(teamMember);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    try {
        const teamMember = await deleteTeamMember(id as string);
        if (!teamMember) {
            return NextResponse.json({ error: 'Team Member not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Team Member deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}
