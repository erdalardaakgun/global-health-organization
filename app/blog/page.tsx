"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Tag, Calendar } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  language: string
  createdAt: string
  published: number
}

export default function BlogPage() {
  const { t, language } = useLanguage()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?language=all")
        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }
        const data = await response.json()
        // Filter only published blogs
        const publishedBlogs = data.filter((blog: Blog) => blog.published === 1)
        setBlogs(publishedBlogs)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Sample categories for demonstration
  const categories = [
    { id: "all", name: t("allPosts") },
    { id: "hospital-seo", name: "Hospital SEO" },
    { id: "patient-acquisition", name: "Patient Acquisition" },
    { id: "medical-marketing", name: "Medical Marketing" },
    { id: "healthcare-tech", name: "Healthcare Technology" },
  ]

  // Filter blogs based on search term, category, and language
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || true // In a real app, you'd check blog categories
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("blogHeroTitle")}</h1>
            <p className="text-xl text-white/90">{t("blogHeroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t("searchArticles")}
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Blog Posts */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-gray-700">{t("noArticlesFound")}</h3>
                  <p className="text-gray-500 mt-2">{t("adjustSearch")}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredBlogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                          <Image
                            src={blog.featuredImage || "/placeholder.svg?height=300&width=400"}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="md:w-2/3 p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(blog.createdAt)}</span>
                            <span className="mx-2">•</span>
                            <Tag className="h-4 w-4 mr-1" />
                            <span>Hospital SEO</span>
                          </div>
                          <h2 className="text-xl font-bold text-primary mb-2">{blog.title}</h2>
                          <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                          <Link href={`/blog/${blog.slug}`} className="text-accent font-medium hover:underline">
                            {t("readMore")}
                          </Link>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Categories */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">{t("categories")}</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="mr-2 mb-2"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Posts */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">{t("featuredPosts")}</h3>
                  <div className="space-y-4">
                    {blogs.slice(0, 3).map((blog) => (
                      <div key={blog.id} className="flex items-start">
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={blog.featuredImage || "/placeholder.svg?height=64&width=64"}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-primary hover:text-accent">
                            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                          </h4>
                          <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">{t("subscribeNewsletter")}</h3>
                  <p className="text-gray-700 mb-4">{t("newsletterDesc")}</p>
                  <form className="space-y-4">
                    <Input type="email" placeholder="Your email address" />
                    <Button className="w-full">{t("subscribe")}</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
