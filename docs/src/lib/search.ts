import { searchIndex } from "@/config/search.js"
import FlexSearch from "flexsearch"

const sectionIndex = new (FlexSearch as any).Document({
  tokenize: "full",
  document: {
    id: "url",
    index: "content",
    store: ["title", "pageTitle"],
  },
  context: {
    resolution: 9,
    depth: 2,
    bidirectional: true,
  },
})

for (let { url, sections } of searchIndex) {
  for (let [title, hash, content] of sections) {
    sectionIndex.add({
      url: url + (hash ? "#" + hash : ""),
      title,
      content: [title, ...content].join("\\n"),
      pageTitle: hash ? sections[0][0] : undefined,
    })
  }
}

interface IndexItem {
  id: string
  doc: {
    pageTitle: string
    title: string
  }
}

interface SearchProps {
  limit?: number
}

export function search(query: string, options: SearchProps = {}) {
  let result = sectionIndex.search(query, {
    ...options,
    enrich: true,
  })

  if (result.length === 0) {
    return []
  }

  return result[0].result.map((item: IndexItem) => ({
    url: item.id,
    title: item.doc.title,
    pageTitle: item.doc.pageTitle,
  }))
}
