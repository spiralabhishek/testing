import { NextRequest, NextResponse } from "next/server";
import {
  createOption,
  getOptionById,
  getAllOptions,
  updateOption,
  deleteOption,
} from "./repository";
import dbConnect from "@/lib/mongodb";
import { createApiResponse } from "@/lib/types/api";
import { getOptions } from "./services";

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const option = await createOption(body);
    return NextResponse.json(option, { status: 201 });
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
    const filters = await getOptions(params);
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
//             const option = await getOptionById(id as string);
//             if (!option) {
//                 return NextResponse.json({ error: 'Option not found' }, { status: 404 });
//             }
//             return NextResponse.json(option);
//         } else {
//             const options = await getAllOptions();
//             return NextResponse.json(options);
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
    const option = await updateOption(id as string, body);
    if (!option) {
      return NextResponse.json({ error: "Option not found" }, { status: 404 });
    }
    return NextResponse.json(option);
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
    const option = await deleteOption(id as string);
    if (!option) {
      return NextResponse.json({ error: "Option not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Option deleted successfully" });
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
