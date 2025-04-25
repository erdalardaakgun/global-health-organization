"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"

interface AdminHeaderProps {
  onLogout: () => void
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            Hospital Digital Admin
          </Link>

          <nav className="hidden md:flex space-x-4">
            <Link href="/admin/dashboard" className="hover:text-accent transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/dashboard/blogs/new" className="hover:text-accent transition-colors">
              New Blog
            </Link>
            <Link href="/admin/dashboard/settings" className="hover:text-accent transition-colors">
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">View Site</span>
          </Link>

          <Button variant="ghost" size="sm" onClick={onLogout} className="text-white/80 hover:text-white">
            <LogOut className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
