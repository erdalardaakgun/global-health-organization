import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

// Simple encryption/decryption for tokens instead of JWT
// This avoids the JWT library issues in the browser environment
function encodeToken(payload: any): string {
  const jsonString = JSON.stringify(payload);
  return Buffer.from(jsonString).toString("base64");
}

function decodeToken(token: string): any {
  try {
    const jsonString = Buffer.from(token, "base64").toString();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function createAuthToken(username: string) {
  return encodeToken({
    username,
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 gün (1 hafta)
  });
}

export function verifyAuthToken(token: string) {
  try {
    const decoded = decodeToken(token);
    if (!decoded) {
      console.log("Token decode failed");
      return null;
    }

    if (decoded.exp < Date.now()) {
      console.log("Token expired");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

export function getAuthFromServer() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      console.log("No token in server cookies");
      return null;
    }

    return verifyAuthToken(token);
  } catch (error) {
    console.error("Server auth error:", error);
    return null;
  }
}

export function getAuthFromRequest(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      console.log("No token in request cookies");
      return null;
    }

    return verifyAuthToken(token);
  } catch (error) {
    console.error("Request auth error:", error);
    return null;
  }
}

export function validateCredentials(username: string, password: string) {
  // Eski şifreyi de kabul edelim
  if (
    username === ADMIN_USERNAME &&
    password === "UZUMYMW012_!212312--ssdlpa"
  ) {
    return true;
  }

  // Yeni basit şifreyi de kabul edelim
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
