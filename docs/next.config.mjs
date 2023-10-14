import markdoc from "@markdoc/next.js"
import { createLoader } from "simple-functional-loader"
// import withSearch from "./src/markdoc/search.mjs"
import mdx from "@next/mdx"

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  webpack(config) {
    // config.module.rules.unshift({
    //   test: /\.mdx?$/,
    //   use: [
    //     createLoader(function (source) {
    //       return (
    //         source + "\nexport const metadata = frontmatter.nextjs?.metadata;"
    //       )
    //     }),
    //   ],
    // })

    return config
  },
}

const withMDX = mdx({
  extension: /\.mdx?$/,
})
// const withMarkdoc = markdoc({ schemaPath: "./src/markdoc" })

export default withMDX(config)
