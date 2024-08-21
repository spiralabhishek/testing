// middleware.ts
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export function middleware(req: any) {
  const { userId } = getAuth(req);
  const currentUrl = new URL(req.url);

  const isPublicRoute = ["/sign-in", "/sign-up", "/", "/dashboard"].some(route => currentUrl.pathname.startsWith(route));
  
  // Redirect if trying to access a protected route while not logged in
  if (!userId && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  
  // Redirect logged-in users from public routes to dashboard
  if (userId && isPublicRoute && currentUrl.pathname !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
