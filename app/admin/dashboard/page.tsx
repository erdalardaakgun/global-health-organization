"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Settings } from "lucide-react";
import AdminBlogList from "@/components/admin/blog-list";
import AdminHeader from "@/components/admin/header";

interface BlogStats {
  total: number;
  turkish: number;
  english: number;
  arabic: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [blogStats, setBlogStats] = useState<BlogStats>({
    total: 0,
    turkish: 0,
    english: 0,
    arabic: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include", // Cookie'yi de gönder
        });

        const data = await response.json();

        if (data.authenticated) {
          console.log("User is authenticated");
          setAuthenticated(true);
          fetchBlogStats();
        } else {
          console.log("User is not authenticated, redirecting");
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  const fetchBlogStats = async () => {
    try {
      const response = await fetch("/api/blogs?language=all");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const blogs = await response.json();

      // Calculate stats
      const stats = {
        total: blogs.length,
        turkish: blogs.filter((blog: any) => blog.language === "tr").length,
        english: blogs.filter((blog: any) => blog.language === "en").length,
        arabic: blogs.filter((blog: any) => blog.language === "ar").length,
      };

      setBlogStats(stats);
    } catch (error) {
      console.error("Error fetching blog stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Cookie'yi sil
    document.cookie = "auth-token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto py-6 px-4">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={() => router.push("/admin/dashboard/blogs/new")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Blog Posts</CardTitle>
                <CardDescription>
                  All published and draft articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{blogStats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Languages</CardTitle>
                <CardDescription>Content distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm font-medium">Turkish</div>
                    <div className="text-2xl font-bold">
                      {blogStats.turkish}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">English</div>
                    <div className="text-2xl font-bold">
                      {blogStats.english}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Arabic</div>
                    <div className="text-2xl font-bold">{blogStats.arabic}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push("/admin/dashboard/blogs/new")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Blog Post
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push("/admin/dashboard/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all-blogs">
            <TabsList>
              <TabsTrigger value="all-blogs">All Blog Posts</TabsTrigger>
              <TabsTrigger value="turkish">Turkish</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="arabic">Arabic</TabsTrigger>
            </TabsList>
            <TabsContent value="all-blogs" className="mt-6">
              <AdminBlogList language="all" />
            </TabsContent>
            <TabsContent value="turkish" className="mt-6">
              <AdminBlogList language="tr" />
            </TabsContent>
            <TabsContent value="english" className="mt-6">
              <AdminBlogList language="en" />
            </TabsContent>
            <TabsContent value="arabic" className="mt-6">
              <AdminBlogList language="ar" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
