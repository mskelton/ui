import withSearch from "./src/config/search.js"
import { fileURLToPath } from "node:url"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import mdx from "@next/mdx"
import shiki from "shiki"
import rehypeShiki from "@mskelton/rehype-shiki"
import remarkExtractFrontmatter from "@mskelton/remark-extract-frontmatter"

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
      remarkExtractFrontmatter,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
    ],
    rehypePlugins: [[rehypeShiki, { highlighter }]],
  },
})

export default withSearch(withMDX(config))
