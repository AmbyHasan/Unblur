import { auth } from "./auth"
import { NextResponse } from "next/server"

// Public routes that don't require authentication
const publicRoutes = ["/", "/auth" ,"/auth/error"  , "/auth/:path*"] //add any other public routes here
const authRoutes = [""] // "/auth"

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session
  
  const isApiRoute = nextUrl.pathname.startsWith("/api")
  const isAuthApiRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  
  // allow NextAuth API routes to pass through (OAuth callbacks, signin, etc.)
  if (isAuthApiRoute) {
    return NextResponse.next()
  }
 
 if (isApiRoute && !isLoggedIn) {
  return new Response("Unauthorized", { status: 401 })
}
  
  // if it is an auth route and user is logged in, redirect to dashboard
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return NextResponse.next()
  }
  
  // if the user is not logges in and is trying to access a protected route, redirect to auth page
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", nextUrl))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ],
}