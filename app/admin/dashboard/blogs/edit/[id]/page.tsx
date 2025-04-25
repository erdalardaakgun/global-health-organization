"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import BlogEditor from "@/components/admin/blog-editor"
import AdminHeader from "@/components/admin/header"

export default function EditBlogPost() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [blog, setBlog] = useState<any>(null)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const blogId = params.id

  useEffect(() => {
    // Basitleştirilmiş auth kontrolü - cookie varlığını kontrol et
    const checkAuth = async () => {
      const hasAuthCookie = document.cookie.includes("auth-token=")

      if (!hasAuthCookie) {
        console.log("No auth cookie found, redirecting to login")
        router.push("/admin/login")
        return
      }

      setAuthenticated(true)

      // Fetch blog data
      try {
        const blogResponse = await fetch(`/api/blogs/${blogId}`)
        if (!blogResponse.ok) {
          throw new Error("Failed to fetch blog")
        }

        const blogData = await blogResponse.json()
        setBlog(blogData)
      } catch (error: any) {
        setError(error.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, blogId])

  const handleLogout = () => {
    // Cookie'yi sil
    document.cookie = "auth-token=; path=/; max-age=0"
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect in useEffect
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader onLogout={handleLogout} />
        <main className="container mx-auto py-6 px-4">
          <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
          <div className="mt-4">
            <button onClick={() => router.push("/admin/dashboard")} className="text-primary hover:underline">
              Return to Dashboard
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader onLogout={handleLogout} />
        <main className="container mx-auto py-6 px-4">
          <div className="text-center">Blog post not found</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="text-gray-500">Update your digital hospital marketing content</p>
        </div>

        <BlogEditor initialData={blog} isEditing={true} />
      </main>
    </div>
  )
}
