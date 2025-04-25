import { type NextRequest, NextResponse } from "next/server"
import { validateCredentials, createAuthToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    console.log("Login attempt:", username)

    if (!validateCredentials(username, password)) {
      console.log("Invalid credentials")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = createAuthToken(username)
    console.log("Authentication successful, token created")

    // Set the auth token as a cookie
    const response = NextResponse.json({ success: true })

    // Ensure cookie is set properly
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: "auth-token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })

  return response
}
