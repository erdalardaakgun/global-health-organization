"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Save, ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TiptapEditor from "./tiptap-editor";

interface BlogEditorProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function BlogEditor({
  initialData,
  isEditing = false,
}: BlogEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [language, setLanguage] = useState(initialData?.language || "tr");
  const [published, setPublished] = useState(initialData?.published === 1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const hasAuthCookie = document.cookie.includes("auth-token=");
      setAuthenticated(hasAuthCookie);

      if (!hasAuthCookie) {
        console.warn("No auth cookie found in blog editor");
      }
    };

    checkAuth();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && title && !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      );
    }
  }, [title, isEditing, slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    // Check authentication before submitting
    if (!authenticated) {
      setError("You are not authenticated. Please log in again.");
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const blogData = {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      language,
      published,
    };

    try {
      let response;

      if (isEditing) {
        response = await fetch(`/api/blogs/${initialData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
          credentials: "include", // Important: include credentials to send cookies
        });
      } else {
        response = await fetch("/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
          credentials: "include", // Important: include credentials to send cookies
        });
      }

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(data.error || "Failed to save blog post");
      }

      setSuccess(
        isEditing
          ? "Blog post updated successfully!"
          : "Blog post created successfully!"
      );

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred");

      // If authentication error, redirect to login
      if (err.message.includes("Authentication failed")) {
        setTimeout(() => {
          router.push("/admin/login");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Turkish</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="blog-post-url"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the blog post"
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <div className="flex mt-1">
                <Input
                  id="featuredImage"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <div className="mt-1">
                <TiptapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Write your blog content here..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
              <Label htmlFor="published">
                Publish immediately (If you want to publish directly)
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/dashboard")}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Saving..." : isEditing ? "Update Post" : "Save Post"}
        </Button>
      </div>
    </form>
  );
}
