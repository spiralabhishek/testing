import { NextRequest, NextResponse } from 'next/server';
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from './repository';
import dbConnect from '@/lib/mongodb';
import { createApiResponse } from '@/lib/types/api';
import { getPosts } from './services';
import { checkUserRole } from '@/lib/auth';

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    await checkUserRole(["Admin", "Customer"]);
    const body = await req.json();
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}

// NEW GET AS USING SERVICE.TS
export async function GET(req: NextRequest) {
  const params: Record<string, string> = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );
  try {
    await checkUserRole(["Admin", "Customer"]);
    const filters = await getPosts(params);
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

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  try {
    await checkUserRole(["Admin", "Customer"]);
    const body = await req.json();
    const post = await getPostById(id as string);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    const updatedPost = await updatePost(id as string, body);
    return NextResponse.json(updatedPost);
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
    await checkUserRole(["Admin", "Customer"]);
    const post = await getPostById(id as string);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    const deletedPost = await deletePost(id as string);
    return NextResponse.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}
