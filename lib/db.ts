import { Database } from "sqlite3"
import { open, type Database as SQLiteDatabase } from "sqlite"
import path from "path"
import fs from "fs"

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

let db: SQLiteDatabase | null = null

export async function getDb() {
  if (!db) {
    db = await open({
      filename: path.join(dataDir, "hospital-digital.sqlite"),
      driver: Database,
    })

    // Initialize database tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        featuredImage TEXT,
        language TEXT DEFAULT 'tr',
        published BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)
  }

  return db
}

export async function getAllBlogs(language = "all") {
  const db = await getDb()

  if (language === "all") {
    return db.all("SELECT * FROM blogs ORDER BY createdAt DESC")
  }

  return db.all("SELECT * FROM blogs WHERE language = ? ORDER BY createdAt DESC", [language])
}

export async function getBlogById(id: string) {
  const db = await getDb()
  return db.get("SELECT * FROM blogs WHERE id = ?", [id])
}

export async function getBlogBySlug(slug: string) {
  const db = await getDb()
  return db.get("SELECT * FROM blogs WHERE slug = ?", [slug])
}

export async function createBlog(blogData: any) {
  const db = await getDb()

  const { title, slug, content, excerpt, featuredImage, language = "tr", published = false } = blogData

  const result = await db.run(
    "INSERT INTO blogs (title, slug, content, excerpt, featuredImage, language, published) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, slug, content, excerpt, featuredImage, language, published ? 1 : 0],
  )

  return result.lastID
}

export async function updateBlog(id: string, blogData: any) {
  const db = await getDb()

  const { title, slug, content, excerpt, featuredImage, language, published } = blogData

  await db.run(
    "UPDATE blogs SET title = ?, slug = ?, content = ?, excerpt = ?, featuredImage = ?, language = ?, published = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
    [title, slug, content, excerpt, featuredImage, language, published ? 1 : 0, id],
  )

  return getBlogById(id)
}

export async function deleteBlog(id: string) {
  const db = await getDb()
  await db.run("DELETE FROM blogs WHERE id = ?", [id])
  return { success: true }
}
