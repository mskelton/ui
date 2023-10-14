import MarkdownPre from "./components/markdown/MarkdownPre"

export function useMDXComponents(components: {
  [component: string]: React.ComponentType
}) {
  return {
    ...components,
    pre: MarkdownPre,
  }
}
