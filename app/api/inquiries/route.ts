import { NextRequest, NextResponse } from 'next/server';
import {
    createInquiry,
    getInquiryById,
    getAllInquiries,
    updateInquiry,
    deleteInquiry,
    permanentlyDeleteInquiry
} from './repository';
import dbConnect from '@/lib/mongodb';
import { getInquiries } from './services';
import { createApiResponse } from '@/lib/types/api';

await dbConnect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const inquiry = await createInquiry(body);
        return NextResponse.json(inquiry, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}

// export async function GET(req: NextRequest) {
//     const id = req.nextUrl.searchParams.get('id');
//     try {
//         if (id) {
//             const inquiry = await getInquiryById(id as string);
//             if (!inquiry) {
//                 return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
//             }
//             return NextResponse.json(inquiry);
//         } else {
//             const inquiries = await getAllInquiries();
//             return NextResponse.json(inquiries);
//         }
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 400 });
//         }
//         return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
//     }
// }


// NEW GET AS USING SERVICE.TS
export async function GET(req: NextRequest) {
    const params: Record<string,string> = Object.fromEntries(req.nextUrl.searchParams.entries());
    try {
        const filters = await getInquiries(params);
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

export async function PUT(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    try {
        const body = await req.json();
        const inquiry = await updateInquiry(id as string, body);
        if (!inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }
        return NextResponse.json(inquiry);
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
        let inquiry;

        if (action === 'permanently') {
            inquiry = await permanentlyDeleteInquiry(id as string);
        } else {
            inquiry = await deleteInquiry(id as string);
        }

        if (!inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }

        const message = action === 'permanently'
            ? 'Inquiry permanently deleted'
            : 'Inquiry marked as deleted';

        return NextResponse.json({ message });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}
