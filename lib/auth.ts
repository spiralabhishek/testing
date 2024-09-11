import { UserModel as User } from "@/app/api/users/model";
import { auth, clerkClient } from "@clerk/nextjs/server";
import dbConnect from "./mongodb";

export async function checkUserRole(allowedRoles: string[]) {
    const { userId } = auth();
    if (userId) {
        await dbConnect()
        const clerkUser = await clerkClient.users.getUser(userId);
        const clerkUserRole = clerkUser.publicMetadata.role as string;
        const clerkUserId = clerkUser.publicMetadata.userId as string;
        const userData = await User.exists({ _id: clerkUserId });
        if (!allowedRoles.includes(clerkUserRole)) {
            throw new Error("Forbidden");
        }
        if (!userData) {
            throw new Error("User not found");
        }
        return { userId, clerkUserId, clerkUserRole }
    } else {
        throw new Error("Unauthorized");
    }
}