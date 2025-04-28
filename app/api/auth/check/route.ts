import { type NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Cookie'den token al
    const token = request.cookies.get("auth-token")?.value;

    console.log("Auth check - token exists:", !!token);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Tokenı çözümle ve doğrula
    const auth = verifyAuthToken(token);

    if (!auth) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Token geçerliyse kullanıcıyı authenticated kabul et
    return NextResponse.json({
      authenticated: true,
      user: {
        username: auth.username,
        role: auth.role,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Authentication check failed" },
      { status: 500 }
    );
  }
}
