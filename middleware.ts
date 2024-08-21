
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.

import { authMiddleware } from "@clerk/nextjs/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/clerk"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher([
//     "/sign-in",
//     "/sign-up",
//     "/",
//     "/dashboard",
//     "/api/webhooks/clerk"
// ])

// const isPublicApiRoute = createRouteMatcher([
//     "/api/"
// ])

// export default clerkMiddleware((auth, req) => {
//     const { userId } = auth();
//     const currentUrl = new URL(req.url)
//     const isAccessingDashboard = currentUrl.pathname === "/dashboard"
//     const isApiRequest = currentUrl.pathname.startsWith("/api")

//     // If user is logged in and accessing a public route but not the dashboard
//     if (userId && isPublicRoute(req) && !isAccessingDashboard) {
//         return NextResponse.redirect(new URL("/dashboard", req.url))
//     }
//     //not logged in
//     if (!userId) {
//         // If user is not logged in and trying to access a protected route
//         if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
//             return NextResponse.redirect(new URL("/sign-in", req.url))
//         }

//         // If the request is for a protected API and the user is not logged in
//         if (isApiRequest && !isPublicApiRoute(req)) {
//             return NextResponse.redirect(new URL("/sign-in", req.url))
//         }
//     }
//     return NextResponse.next()

// })

// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
