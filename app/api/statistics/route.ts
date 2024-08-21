import { NextRequest, NextResponse } from "next/server";
import {
  createStatistic,
  getStatisticById,
  getAllStatistics,
  updateStatistic,
  deleteStatistic,
} from "./repository";
import dbConnect from "@/lib/mongodb";
import { createApiResponse } from "@/lib/types/api";
import { getStatistics } from "./services";

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const statistic = await createStatistic(body);
    return NextResponse.json(statistic, { status: 201 });
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

export async function GET(req: NextRequest) {
  const params: Record<string, string> = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );
  try {
    const filters = await getStatistics(params);
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
//             const statistic = await getStatisticById(id as string);
//             if (!statistic) {
//                 return NextResponse.json({ error: 'Statistic not found' }, { status: 404 });
//             }
//             return NextResponse.json(statistic);
//         } else {
//             const statistics = await getAllStatistics();
//             return NextResponse.json(statistics);
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
    const statistic = await updateStatistic(id as string, body);
    if (!statistic) {
      return NextResponse.json(
        { error: "Statistic not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(statistic);
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
    const statistic = await deleteStatistic(id as string);
    if (!statistic) {
      return NextResponse.json(
        { error: "Statistic not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Statistic deleted successfully" });
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
