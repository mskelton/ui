import remarkParse from "remark-parse"
import remarkExtractFrontmatter from "@mskelton/remark-extract-frontmatter"
import remarkFrontmatter from "remark-frontmatter"
import { unified } from "unified"
import { slugifyWithCounter } from "@sindresorhus/slugify"
import glob from "fast-glob"
import fs from "node:fs"
import path from "node:path"
import { createLoader } from "simple-functional-loader"
import { fileURLToPath } from "node:url"

const slugify = slugifyWithCounter()

function remarkAST() {
  this.compiler = (tree) => tree
}

function toString(node) {
  let str =
    node.type === "text" && typeof node.value === "string" ? node.value : ""

  if ("children" in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }

  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }

  if (node.type === "heading" || node.type === "paragraph") {
    let content = toString(node).trim()

    if (node.type === "heading" && node.depth <= 2) {
      sections.push([content, slugify(content), []])
    } else {
      sections.at(-1)[2].push(content)
    }
  } else if ("children" in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
    }
  }
}

export default function withSearch(nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: fileURLToPath(import.meta.url),
        use: [
          createLoader(function () {
            let dir = path.resolve("./src/app/[slug]/docs")
            this.addContextDependency(dir)

            let files = glob.sync("*/content.{md,mdx}", { cwd: dir })
            let data = files.map((filename) => {
              let url = `/${filename.replace(/\/content\.mdx?$/, "")}`
              let md = fs.readFileSync(path.join(dir, filename), "utf8")
              let sections

              if (cache.get(filename)?.[0] === md) {
                sections = cache.get(filename)[1]
              } else {
                let file = unified()
                  .use(remarkParse)
                  .use(remarkFrontmatter)
                  .use(remarkExtractFrontmatter)
                  .use(remarkAST)
                  .processSync(md)

                sections = [[file.data.matter.title, null, []]]
                extractSections(file.result, sections)
                cache.set(filename, [md, sections])
              }

              return { url, sections }
            })

            return `export const searchIndex = ${JSON.stringify(data)}`
          }),
        ],
      })

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
