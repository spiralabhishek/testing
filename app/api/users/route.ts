import {
  createUser,
  createCustomer,
  createProfessional,
  getUserById,
  updateUser,
  deleteUser,
  permanentlyDeleteUser,
} from "./repository";
import dbConnect from "@/lib/mongodb";
import { createApiResponse } from "@/lib/types/api";
import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "./services";
import { checkUserRole } from "@/lib/auth";

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    let result;
    if (type === "customer") {
      result = await createCustomer(data);
    } else if (type === "professional") {
      result = await createProfessional(data);
    } else {
      result = await createUser(data);
    }
    return NextResponse.json(result, { status: 201 });
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
    await checkUserRole(["Admin", "Customer"])
    const id = req.nextUrl.searchParams.get("_id");
    const users = await getUsers(params);

    const response = createApiResponse(true, users);

    if (id) {
      const user = await getUserById(id as string);
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    // Concrete error
    if (error instanceof Error) {
      console.error(error)
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    // Unknown error
    const response = createApiResponse(false, "Unknown error occurred")
    return NextResponse.json(response, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await checkUserRole(["Admin", "Customer"])
    const updateData = await req.json();
    const id = req.nextUrl.searchParams.get("id");
    const user = await updateUser(id as string, updateData);
    return NextResponse.json(user, { status: 200 });
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
  try {
    await checkUserRole(["Admin", "Customer"])
    const id = req.nextUrl.searchParams.get("id");
    const permanent = req.nextUrl.searchParams.get("permanent");
    let user;
    if (permanent === "true") {
      user = await permanentlyDeleteUser(id as string);
    } else {
      user = await deleteUser(id as string);
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 400 }
    );
  }
}
