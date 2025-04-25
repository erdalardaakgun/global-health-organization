import { type NextRequest, NextResponse } from "next/server"
import { getAllBlogs, createBlog } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const language = searchParams.get("language") || "all"

    const blogs = await getAllBlogs(language)
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for auth token in cookies
    const token = request.cookies.get("auth-token")?.value

    // Log authentication attempt for debugging
    console.log("Auth token present:", !!token)

    // Simplified auth check - if token exists, allow the request
    if (!token) {
      console.log("No auth token found, returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const blogData = await request.json()

    // Ensure slug is unique by adding timestamp if not provided
    if (!blogData.slug) {
      const timestamp = new Date().getTime()
      const title = blogData.title || "untitled"
      blogData.slug = `${title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")}-${timestamp}`
    }

    const id = await createBlog(blogData)
    console.log("Blog created successfully with ID:", id)

    return NextResponse.json({ id, success: true })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
