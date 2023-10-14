import { Hero } from "@/components/Hero"
import { MainLayout } from "@/components/MainLayout"
import Content from "./content.mdx"
import { QuickLinks, QuickLink } from "@/components/QuickLinks"
import { DocsLayout } from "@/components/DocsLayout"

export default function Page() {
  return (
    <MainLayout hero={<Hero />}>
      <DocsLayout
        frontmatter={{
          title: "Getting started",
        }}
        nodes={[]}
      >
        <p className="lead">
          Learn how to get CacheAdvance set up in your project in under thirty
          minutes or its free.
        </p>

        <QuickLinks>
          <QuickLink
            title="Installation"
            icon="installation"
            href="/"
            description="Step-by-step guides to setting up your system and installing the library."
          />

          <QuickLink
            title="Components"
            icon="presets"
            href="/components"
            description="Learn how the internals work and contribute."
          />
          <QuickLink
            title="Plugins"
            icon="plugins"
            href="/"
            description="Extend the library with third-party plugins or write your own."
          />
          <QuickLink
            title="API reference"
            icon="theming"
            href="/"
            description="Learn to easily customize and modify your app's visual design to fit your brand."
          />
        </QuickLinks>

        <Content />
      </DocsLayout>
    </MainLayout>
  )
}
