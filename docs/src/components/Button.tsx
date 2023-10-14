import Link from "next/link"
import { VariantProps, tv } from "tailwind-variants"

const styles = tv({
  base: "transition-colors rounded-full py-2 px-4 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  variants: {
    variant: {
      primary:
        "bg-sky-300 font-semibold text-slate-900 hover:bg-sky-200 focus-visible:outline-sky-300/50 active:bg-sky-500",
      secondary:
        "rounded-full bg-slate-800 font-medium text-white hover:bg-slate-700 focus-visible:outline-white/50 active:text-slate-400",
    },
  },
})

type ButtonProps = VariantProps<typeof styles> &
  (
    | React.ComponentPropsWithoutRef<typeof Link>
    | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })
  )

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  className = styles({ className, variant })

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
