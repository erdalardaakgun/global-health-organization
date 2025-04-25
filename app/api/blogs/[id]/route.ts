import { type NextRequest, NextResponse } from "next/server"
import { getBlogById, updateBlog, deleteBlog } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const blog = await getBlogById(params.id)

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check for auth token in cookies
    const token = request.cookies.get("auth-token")?.value

    // Log authentication attempt for debugging
    console.log("Auth token present for update:", !!token)

    // Simplified auth check - if token exists, allow the request
    if (!token) {
      console.log("No auth token found for update, returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const blogData = await request.json()
    const updatedBlog = await updateBlog(params.id, blogData)
    console.log("Blog updated successfully:", params.id)

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check for auth token in cookies
    const token = request.cookies.get("auth-token")?.value

    // Simplified auth check - if token exists, allow the request
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteBlog(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
