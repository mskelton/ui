import clsx from "clsx"

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-slate dark:prose-invert max-w-none dark:text-slate-400",
        // headings
        "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]",
        // lead
        "prose-lead:text-slate-500 dark:prose-lead:text-slate-400",
        // links
        "prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:transition-all",
        // link underline
        "prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)]",
        // pre
        "prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10",
        // hr
        "dark:prose-hr:border-slate-800",
        // code
        "prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-900 prose-code:shadow-lg dark:prose-code:bg-slate-800/60 dark:prose-code:shadow-none dark:prose-code:ring-1 dark:prose-code:ring-zinc-700 prose-code:before:content-none prose-code:after:content-none",
      )}
      {...props}
    />
  )
}
