import { NextRequest, NextResponse } from 'next/server';
import {
    createCategory,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory,
    permanentlyDeleteCategory
} from './repository';
import dbConnect from '@/lib/mongodb';
import { createApiResponse } from '@/lib/types/api';
import { getCategories } from './services';

await dbConnect();

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const category = await createCategory(body);
        return NextResponse.json(category, { status: 201 });
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
        const filters = await getCategories(params);
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
//             const category = await getCategoryById(id as string);
//             if (!category) {
//                 return NextResponse.json({ error: 'Category not found' }, { status: 404 });
//             }
//             return NextResponse.json(category);
//         } else {
//             const categories = await getAllCategories();
//             return NextResponse.json(categories);
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
        const category = await updateCategory(id as string, body);
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json(category);
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
        let category;

        if (action === 'permanently') {
            category = await permanentlyDeleteCategory(id as string);
        } else {
            category = await deleteCategory(id as string);
        }

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const message = action === 'permanently'
            ? 'Category permanently deleted'
            : 'Category marked as deleted';

        return NextResponse.json({ message });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
    }
}
