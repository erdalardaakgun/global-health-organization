"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Blog {
  id: number
  title: string
  slug: string
  language: string
  published: number
  createdAt: string
}

interface AdminBlogListProps {
  language: string
}

export default function AdminBlogList({ language }: AdminBlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs?language=${language}`)
        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }
        const data = await response.json()
        setBlogs(data)
      } catch (error: any) {
        setError(error.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [language])

  const handleEdit = (id: number) => {
    router.push(`/admin/dashboard/blogs/edit/${id}`)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include", // Important: include credentials to send cookies
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error("Failed to delete blog")
      }

      // Remove the deleted blog from the state
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error: any) {
      if (error.message.includes("Authentication failed")) {
        alert("Your session has expired. Please log in again.")
        router.push("/admin/login")
      } else {
        alert(error.message || "An error occurred while deleting the blog")
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (blogs.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 mb-4">No blog posts found</p>
          <Button onClick={() => router.push("/admin/dashboard/blogs/new")}>Create Your First Blog Post</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>
                {blog.language === "tr"
                  ? "🇹🇷 Turkish"
                  : blog.language === "en"
                    ? "🇬🇧 English"
                    : blog.language === "ar"
                      ? "🇸🇦 Arabic"
                      : blog.language}
              </TableCell>
              <TableCell>
                {blog.published ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Eye className="h-3 w-3 mr-1" /> Published
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <EyeOff className="h-3 w-3 mr-1" /> Draft
                  </span>
                )}
              </TableCell>
              <TableCell>{formatDate(blog.createdAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(blog.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
