import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Doğrudan cookie'yi kontrol edelim
    const token = request.cookies.get("auth-token")?.value

    console.log("Auth check - token exists:", !!token)

    // Basitleştirilmiş kontrol - token varsa yeterli
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Token varsa kullanıcıyı doğrulanmış kabul edelim
    return NextResponse.json({
      authenticated: true,
      user: {
        username: "admin",
        role: "admin",
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Authentication check failed" }, { status: 500 })
  }
}
