import { NextRequest, NextResponse } from 'next/server';
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from './repository';
import dbConnect from '@/lib/mongodb';
import { createApiResponse } from '@/lib/types/api';
import { getPosts, PostQueryFilters } from './services';
import { checkUserRole } from '@/lib/auth';
import PostModel from './model';
import { GeoQueryParams, ILocation } from '@/lib/types/common';

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    // await checkUserRole(["Admin", "Professional"]);
    const body = await req.json();
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
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

    const updatedParam = {
      ...params,
      longitude: params.longitude ? parseFloat(params.longitude) : undefined,
      latitude: params.latitude ? parseFloat(params.latitude) : undefined,
      page: params.page ? parseInt(params.page) : undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
      radiusKm: params.radiusKm ? parseFloat(params.radiusKm) : undefined,
    } as PostQueryFilters & GeoQueryParams & ILocation & { page?: number; limit?: number };

    const filters = await getPosts(updatedParam);
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
    const { clerkUserId, clerkUserRole } = await checkUserRole(["Admin", "Professional"]);
    const checkUserPost = await PostModel.exists({ _id: id, postedBy: clerkUserId })
    if (checkUserPost || clerkUserRole === "Admin") {
      const body = await req.json();
      const post = await getPostById(id as string);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      const updatedPost = await updatePost(id as string, body);
      return NextResponse.json(updatedPost);
    } else {
      const response = createApiResponse(false, undefined, {
        code: '403',
        message: "You are not authorized to modify this post as it was not created by you.",
      });
      return NextResponse.json(response, { status: 403 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  try {
    const { clerkUserId, clerkUserRole } = await checkUserRole(["Admin", "Professional"]);
    const checkUserPost = await PostModel.exists({ _id: id, postedBy: clerkUserId })
    if (checkUserPost || clerkUserRole === "Admin") {
      const post = await getPostById(id as string);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      const deletedPost = await deletePost(id as string);
      return NextResponse.json({ message: 'Post deleted successfully', deletedPost });
    } else {
      const response = createApiResponse(false, undefined, {
        code: '403',
        message: "You are not authorized to delete this post as it was not created by you.",
      });
      return NextResponse.json(response, { status: 403 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}
