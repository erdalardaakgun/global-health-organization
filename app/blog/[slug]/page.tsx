"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface Blog {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: string
  language: string
  createdAt: string
  published: number
}

export default function BlogDetailPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const slug = params.slug

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // First, get all blogs to find the one with matching slug
        const response = await fetch("/api/blogs?language=all")
        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }

        const blogs = await response.json()
        const currentBlog = blogs.find((b: Blog) => b.slug === slug)

        if (!currentBlog) {
          throw new Error("Blog not found")
        }

        setBlog(currentBlog)

        // Get related posts (excluding current blog)
        const related = blogs.filter((b: Blog) => b.id !== currentBlog.id && b.published === 1).slice(0, 3)
        setRelatedPosts(related)
      } catch (error: any) {
        setError(error.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlog()
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
        <p className="text-gray-600 mb-8">{error || "Blog post not found"}</p>
        <Link href="/blog" className="text-accent hover:underline">
          {t("readMore")}
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>
            <div className="flex items-center justify-center text-white/80">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(blog.createdAt)}</span>
              <span className="mx-2">•</span>
              <User className="h-4 w-4 mr-1" />
              <span>Global Health Team</span>
              <span className="mx-2">•</span>
              <Tag className="h-4 w-4 mr-1" />
              <span>Hospital SEO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <Card>
                <CardContent className="p-6">
                  {blog.featuredImage && (
                    <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={blog.featuredImage || "/placeholder.svg?height=400&width=800"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

                  {/* Social Share */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium mr-4 flex items-center">
                        <Share2 className="h-4 w-4 mr-2" /> {t("shareArticle")}:
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Author Card */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image src="/placeholder.svg?height=64&width=64" alt="Author" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Global Health Team</h3>
                      <p className="text-gray-600 text-sm">Healthcare Marketing Specialists</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Our team of healthcare marketing experts specializes in digital strategies for hospitals and
                    healthcare providers.
                  </p>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">{t("relatedArticles")}</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <div key={post.id} className="flex items-start">
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={post.featuredImage || "/placeholder.svg?height=64&width=64"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-primary hover:text-accent">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
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
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <Button className="w-full">{t("subscribe")}</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("readyToTransformPresence")}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t("contactUsToday")}</p>
          <Link
            href="/contact"
            className="bg-white text-accent px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
          >
            {t("getInTouch")}
          </Link>
        </div>
      </section>
    </>
  )
}
