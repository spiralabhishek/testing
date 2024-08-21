import { NextRequest, NextResponse } from "next/server";
import {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
} from "./repository";
import dbConnect from "@/lib/mongodb";
import { getReviews } from "./services";
import { createApiResponse } from "@/lib/types/api";

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const review = await createReview(body);
    return NextResponse.json(review, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 400 }
    );
  }
}

// NEW GET AS USING SERVICE.TS
export async function GET(req: NextRequest) {
  const params: Record<string, string> = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );
  try {
    const filters = await getReviews(params);
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
//             const review = await getReviewById(id as string);
//             if (!review) {
//                 return NextResponse.json({ error: 'Review not found' }, { status: 404 });
//             }
//             return NextResponse.json(review);
//         } else {
//             const reviews = await getAllReviews();
//             return NextResponse.json(reviews);
//         }
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 400 });
//         }
//         return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
//     }
// }

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    const body = await req.json();
    const review = await updateReview(id as string, body);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json(review);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    const review = await deleteReview(id as string);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 400 }
    );
  }
}
