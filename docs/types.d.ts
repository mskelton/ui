import { type SearchOptions } from "flexsearch"

declare module "@/config/search.js" {
  export type Result = {
    url: string
    title: string
    pageTitle: string
    sections: [title: string, hash: string, content: string][]
  }

  export const searchIndex: Result[]
}
