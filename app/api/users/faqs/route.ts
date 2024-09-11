import { updateUserFAQ, deleteUserFAQ, getUserFAQs } from './repository';
import dbConnect from '@/lib/mongodb';
import { createApiResponse } from '@/lib/types/api';
import { NextRequest, NextResponse } from 'next/server';
import { checkUserRole } from '@/lib/auth';

await dbConnect();

export async function POST(req: NextRequest) {
  
  try {
    const body = await req.json();
    console.log("-------------------", body);
    const { clerkUserId } = await checkUserRole(["Admin", "Customer"]);
    const { question, answer } = body;

    const result = await updateUserFAQ(clerkUserId, { question, answer });
    const response = createApiResponse(true, result);
    return NextResponse.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { clerkUserId } = await checkUserRole(["Admin", "Customer"]);

  try {
    const faqs = await getUserFAQs(clerkUserId as string);
    const response = createApiResponse(true, faqs);
    return NextResponse.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, faqId } = await req.json();
    const result = await deleteUserFAQ(userId, faqId);
    const response = createApiResponse(true, result);
    return NextResponse.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}
