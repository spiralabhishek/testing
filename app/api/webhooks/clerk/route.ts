import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser, deleteUser, updateUser } from "../../users/repository";
import { UserType } from "@/lib/types/common";
import dbConnect from "@/lib/mongodb";


export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // CREATE User in mongodb
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name } =
      evt.data;


    const user: any = {
      clerkId: id,
      vat: Math.random().toString().slice(2, 11),
      type: UserType.Professional,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      profilePicture: image_url,
      phone: Math.random().toString().slice(2, 11)
    };
    console.log("user", user);

    await dbConnect();
    const newUser = await createUser(user);
    console.log("newUser", newUser);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
          role: UserType.Professional
        },
      });
    }

    return NextResponse.json({ message: "New user created", user: newUser });
  }

  // update user by clerk
  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, first_name, last_name } =
      evt.data;
    await dbConnect();

    const user: any = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      profilePicture: image_url,
    };

    const updatedUser = await updateUser(id, user);
    return NextResponse.json({ message: "User profile updated", user: updatedUser });
  }

  // delete user by clerk
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    await dbConnect();

    if (id) {
      await deleteUser(id);
      return NextResponse.json({ message: "User account deleted" });
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);
  return new Response("", { status: 200 });
}
