import { toText } from "hast-util-to-text"
import { SKIP, visit } from "unist-util-visit"

export default function rehypeShiki({ highlighter }) {
  return (ast) => {
    visit(
      ast,
      (node) => {
        return (
          node.tagName === "pre" &&
          Array.isArray(node.children) &&
          node.children.length === 1 &&
          node.children[0].tagName === "code" &&
          typeof node.children[0].properties === "object" &&
          node.children[0].properties !== null &&
          Array.isArray(node.children[0].properties.className) &&
          typeof node.children[0].properties.className[0] === "string" &&
          node.children[0].properties.className[0].startsWith("language-")
        )
      },
      (node) => {
        const source = toText(node).slice(0, -1)
        const language = node.children[0].properties.className[0]
          .split("language-")
          .at(-1)

        let output = []
        try {
          output = highlighter.codeToThemedTokens(source, language)
        } catch (error) {
          return
        }

        // Add properties to the pre tag
        node.properties ??= {}
        node.properties.className ??= []
        node.properties.className.push("shiki")

        const code = node.children[0]
        code.children = output.map((line) => {
          const children = line.length
            ? line.map((token) => ({
                type: "element",
                tagName: "span",
                properties: { style: `color: ${token.color};` },
                children: [{ type: "text", value: token.content }],
              }))
            : [{ type: "text", value: "\u200b" }]

          return {
            type: "element",
            tagName: "span",
            properties: {
              className: ["line"],
            },
            children: children,
          }
        })

        return SKIP
      },
    )
  }
}