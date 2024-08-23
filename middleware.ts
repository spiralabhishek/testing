import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard",
    "/api/webhooks/clerk",
    "/api/posts",
    "/posts",
    "/posts/(*)",
    "/api/users",
    "/api/teammembers",
    "/api/statistics",
    "/api/reviews",
    "/api/options",
    "/api/inquiries",
    "/api/boards",
    "/api/categories"
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
