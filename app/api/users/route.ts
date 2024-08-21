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
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "./services";

await dbConnect();

// Middleware for authentication and role checking
async function checkAuthorization() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient.users.getUser(userId);
  const userRole = user.publicMetadata.role as string;

  return { userId, userRole };
}

export async function POST(req: NextRequest) {
  try {
    const { userRole } = await checkAuthorization();

    if (userRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
    const { userId, userRole } = await checkAuthorization();
    const id = req.nextUrl.searchParams.get("_id");

    if (userRole !== "admin" && id !== userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

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

// export async function GET(req: NextRequest) {
//   try {
//     const { userId, userRole } = await checkAuthorization();
//     const id = req.nextUrl.searchParams.get("id");

//     if (userRole !== 'admin' && id !== userId) {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }

//     if (id) {
//       const user = await getUserById(id as string);
//       return NextResponse.json(user, { status: 200 });
//     } else {
//       return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }
//     return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
//   }
// };

export async function PUT(req: NextRequest) {
  try {
    const { userId, userRole } = await checkAuthorization();
    const updateData = await req.json();
    const id = req.nextUrl.searchParams.get("id");

    if (userRole !== "admin" && id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
    const { userId, userRole } = await checkAuthorization();
    const id = req.nextUrl.searchParams.get("id");
    const permanent = req.nextUrl.searchParams.get("permanent");

    if (userRole !== "admin" && id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
