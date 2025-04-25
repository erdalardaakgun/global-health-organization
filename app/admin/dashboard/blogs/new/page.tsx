"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BlogEditor from "@/components/admin/blog-editor"
import AdminHeader from "@/components/admin/header"

export default function NewBlogPost() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Basitleştirilmiş auth kontrolü - cookie varlığını kontrol et
    const checkAuth = () => {
      const hasAuthCookie = document.cookie.includes("auth-token=")

      if (hasAuthCookie) {
        console.log("Auth cookie found, user is authenticated")
        setAuthenticated(true)
      } else {
        console.log("No auth cookie found, redirecting to login")
        router.push("/admin/login")
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

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

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
          <p className="text-gray-500">Create content for your digital hospital marketing strategy</p>
        </div>

        <BlogEditor />
      </main>
    </div>
  )
}
