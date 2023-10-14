import { DocsLayout } from "@/components/DocsLayout"
import { getAllPageSlugs, getPage } from "./lib/pages"
import { withOpenGraph } from "@/lib/metadata"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { description, title } = await getPage(params.slug)

  return withOpenGraph({
    description,
    openGraph: { url: `/${params.slug}` },
    title,
  })
}

export default async function Page({ params }: PageProps) {
  const { component: Component, ...meta } = await getPage(params.slug)

  return (
    <DocsLayout meta={meta} nodes={[]}>
      <Component />
    </DocsLayout>
  )
}
