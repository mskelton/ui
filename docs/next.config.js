import remarkFrontmatterMeta from "./src/config/remark-frontmatter-meta.js"
import { fileURLToPath } from "node:url"
import rehypeShiki from "./src/config/rehype-shiki.js"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import mdx from "@next/mdx"
import shiki from "shiki"

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
}

const themeURL = new URL("./src/config/tokyonight.json", import.meta.url)
const highlighter = await shiki.getHighlighter({
  theme: await shiki.loadTheme(fileURLToPath(themeURL)),
})

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatterMeta,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
    ],
    rehypePlugins: [[rehypeShiki, { highlighter }]],
  },
})

export default withMDX(config)
