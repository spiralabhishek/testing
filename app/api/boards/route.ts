import { NextRequest, NextResponse } from 'next/server';
import {
    createBoard,
    getBoardById,
    updateBoard,
    deleteBoard,
    permanentlyDeleteBoard
} from './repository';
import dbConnect from '@/lib/mongodb';
import { getBoards } from './services';
import { createApiResponse } from '@/lib/types/api';

await dbConnect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const board = await createBoard(body);
        return NextResponse.json(board, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}

// NEW GET AS USING SERVICE.TS
export async function GET(req: NextRequest) {
    const params: Record<string,string> = Object.fromEntries(req.nextUrl.searchParams.entries());
    try {
        const filters = await getBoards(params);
        const response = createApiResponse(true, filters);
        return NextResponse.json(response);
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            const response = createApiResponse(false, error.message);
            return NextResponse.json(response, { status: 400 });
        }
        const response = createApiResponse(false, 'Unknown error occurred');
        return NextResponse.json(response, { status: 400 });
    }
}

// export async function GET(req: NextRequest) {

//     const id = req.nextUrl.searchParams.get('id');
//     try {
//         if (id) {
//             const board = await getBoardById(id as string);
//             if (!board) {
//                 return NextResponse.json({ error: 'Board not found' }, { status: 404 });
//             }
//             return NextResponse.json(board);
//         } else {
//             return NextResponse.json({ error: "Id is required" }, { status: 400 });
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
        const board = await updateBoard(id as string, body);
        if (!board) {
            return NextResponse.json({ error: 'Board not found' }, { status: 404 });
        }
        return NextResponse.json(board);
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
        const action = req.nextUrl.searchParams.get('action');
        let board;

        if (action === 'permanently') {
            board = await permanentlyDeleteBoard(id as string);
        } else {
            board = await deleteBoard(id as string);
        }

        if (!board) {
            return NextResponse.json({ error: 'Board not found' }, { status: 404 });
        }

        const message = action === 'permanently'
            ? 'Board permanently deleted'
            : 'Board marked as deleted';

        return NextResponse.json({ message });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}