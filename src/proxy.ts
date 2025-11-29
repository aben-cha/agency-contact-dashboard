import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

// export default clerkMiddleware(async (auth, req) => {
//   const { isAuthenticated, redirectToSignIn } = await auth()

//   if (!isAuthenticated && isProtectedRoute(req)) {
//     return redirectToSignIn();
//   }
//   if (isAuthenticated && req.nextUrl.pathname === "/") {
//     return Response.redirect(new URL("/dashboard/agencies", req.url));
//   }
// })


// Public routes that anyone can access
const isPublicRoute = createRouteMatcher([
  '/',                    // Landing page
  '/sign-in(.*)',        // Sign in and its sub-routes
  '/sign-up(.*)',        // Sign up and its sub-routes
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const url = request.nextUrl;

  // If user is signed in and tries to access sign-in/sign-up, redirect to dashboard
  if (userId && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect all routes that are not public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};