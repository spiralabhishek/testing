import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { UserModel } from "../../users/model";
import { BaseUser } from "@/lib/types/user";
import { UserType } from "@/lib/types/common";
import { createUser } from "../../users/repository";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined");
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    console.log("Handling user.created event");

    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    if (!email_addresses || email_addresses.length === 0) {
      console.error("Missing email address in user.created event");
      return new Response("Bad Request: Missing email address", { status: 400 });
    }

    const user: any = {
      type: UserType.Professional,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      profilePicture: image_url,
      password: "93rd398fn",
      phone: "74734783478"
    };

    try {
      console.log("User created:", user);
      const newUser = await createUser(user).catch(err => console.log(err))
      console.log("User created:", newUser);

      // await clerkClient.users.updateUserMetadata(id, {
      //   publicMetadata: { userId: newUser._id },
      // });

      return NextResponse.json({ message: "New user created", user: newUser });
    } catch (err) {
      console.error("Error creating user:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  if (eventType === "email.created") {
    // Handle email creation
    const { email_address_id, data, body } = evt.data;
    console.log(`Email created email_address_id: ${email_address_id}`);
    console.log(`Email created body: ${body}`);
    console.log(`Email created data: ${data}`);

    // Implement your logic for handling the email creation event
    // For example, update user records or perform additional actions based on the new email

    return NextResponse.json({ message: "Email created", email: email_address_id });
  }

  console.log(`Webhook with ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
