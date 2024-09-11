import {
  createUser,
  createCustomer,
  createProfessional,
  getUserById,
  updateUser,
  deleteUser,
} from "./repository";
import dbConnect from "@/lib/mongodb";
import { createApiResponse } from "@/lib/types/api";
import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "./services";
import { checkUserRole } from "@/lib/auth";
import { auth, clerkClient } from "@clerk/nextjs/server";

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
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
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
    const { clerkUserRole } = await checkUserRole(["Admin", "Professional"])
    const id = req.nextUrl.searchParams.get("_id");
    if (clerkUserRole === "Admin" && !id) {
      const users = await getUsers(params);
      const response = createApiResponse(true, users);
      return NextResponse.json(response, { status: 200 });
    }
    if (clerkUserRole === "Admin" && !id) {
      const users = await getUsers(params);
      const response = createApiResponse(true, users);
      return NextResponse.json(response, { status: 200 });
    }
    if (id) {
      const user = await getUserById(id as string);
      const response = createApiResponse(true, user);
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
      console.error(error);
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    // Unknown error
    const response = createApiResponse(false, "Unknown error occurred");
    return NextResponse.json(response, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId, clerkUserId } = await checkUserRole(["Admin", "Professional"]);
    const updateData = await req.json();
    const userData = await updateUser(clerkUserId as string, updateData);
    if (userData) {
      await clerkClient.users.updateUser(userId as string, {
        firstName: updateData?.name?.split(" ")[0],
        lastName: updateData.name?.split(" ")[1],
      });
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  try {
    const { userId, clerkUserId } = await checkUserRole(["Admin", "Professional"]);
    const user = await deleteUser(clerkUserId as string);
    await clerkClient.users.deleteUser(userId as string);

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const response = createApiResponse(false, error.message);
      return NextResponse.json(response, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 400 }
    );
  }
}
