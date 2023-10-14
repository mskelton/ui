import { Metadata } from "next"
import { siteMeta } from "./siteMeta"

export function withOpenGraph({
  openGraph,
  twitter,
  title,
  ...props
}: Metadata & { title: string }): Metadata {
  const description = props.description || siteMeta.description

  return {
    ...props,
    description,
    metadataBase: new URL(siteMeta.url),
    openGraph: {
      description,
      locale: "en_US",
      siteName: "UI",
      title,
      type: "website",
      ...openGraph,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      site: "@mskelton",
      title,
      ...twitter,
    },
  }
}
