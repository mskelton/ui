import Link from "next/link"
import { Logomark, Logo } from "./Logo"
import { MobileNavigation } from "./MobileNavigation"
import { Search } from "./Search"
import { ThemeSelector } from "./ThemeSelector"
import { GitHubIcon } from "./icons/GitHubIcon"
import clsx from "clsx"

export function Header() {
  return (
    <>
      <div
        data-testid="sentinel"
        className="absolute h-20"
        style={{ viewTimeline: "--tl" } as React.CSSProperties}
      />

      <header
        className={clsx(
          "sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 sm:px-6 lg:px-8",
          "dark:animate-[header_linear_forwards] dark:shadow-none dark:[animation-range:exit]",
        )}
        style={{ animationTimeline: "--tl" }}
      >
        <div className="mr-6 flex lg:hidden">
          <MobileNavigation />
        </div>

        <div className="relative flex flex-grow basis-0 items-center">
          <Link href="/" aria-label="Home page">
            <Logomark className="h-9 w-9 lg:hidden" />
            <Logo className="hidden h-9 w-auto fill-slate-700 dark:fill-sky-100 lg:block" />
          </Link>
        </div>

        <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
          <Search />
        </div>

        <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
          <ThemeSelector className="relative z-10" />

          <Link
            href="https://github.com/mskelton/ui"
            className="group"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-6 w-6 fill-slate-400 transition-colors group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </Link>
        </div>
      </header>
    </>
  )
}
