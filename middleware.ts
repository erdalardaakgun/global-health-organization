import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for the admin dashboard
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("auth-token")?.value

    console.log("Middleware checking auth token:", token ? "Token exists" : "No token")

    // If there's no token, redirect to login
    if (!token) {
      console.log("No token found, redirecting to login")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Basitleştirilmiş kontrol - token varsa yeterli
    console.log("Token exists, allowing access")
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
}
