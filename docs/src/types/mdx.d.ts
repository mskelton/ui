declare module "*.mdx" {
  let MDXComponent: () => JSX.Element
  export default MDXComponent

  export const meta: import("../components/DocsLayout").PageMeta
}
