import { PageMeta } from "@/components/DocsLayout"
import glob from "fast-glob"
import path from "node:path"

interface Page extends PageMeta {
  component: React.ComponentType
  slug: string
}

export async function getPage(slug: string): Promise<Page> {
  // We have to do a bit of a workaround here to ensure that `.mdx` is part of
  // the static string in the dynamic import. This is required otherwise the
  // Next.js compiler will assume that other files in the docs directory are
  // being dynamically imported which causes RSC issues with metadata.
  const { default: component, meta } = await import(
    `../docs/${slug}/content.mdx`
  )

  return { ...meta, component, slug }
}

export async function getAllPageSlugs() {
  const cwd = path.join(process.cwd(), "app/[slug]/docs")
  const filenames = await glob("*/content.mdx", { cwd })

  return filenames.map((file) => path.basename(path.dirname(file)))
}

export async function getAllPages() {
  const slugs = await getAllPageSlugs()
  const posts = await Promise.all(slugs.map(getPage))

  return posts
}
