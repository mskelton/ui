"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Listbox } from "@headlessui/react"
import clsx from "clsx"
import { DarkIcon } from "./icons/DarkIcon"
import { LightIcon } from "./icons/LightIcon"
import { SystemIcon } from "./icons/SystemIcon"

const themes = [
  { name: "Light", value: "light", icon: LightIcon },
  { name: "Dark", value: "dark", icon: DarkIcon },
  { name: "System", value: "system", icon: SystemIcon },
]


export function ThemeSelector(
  props: React.ComponentPropsWithoutRef<typeof Listbox<"div">>,
) {
  let { theme, setTheme } = useTheme()
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-6 w-6" />
  }

  return (
    <Listbox as="div" value={theme} onChange={setTheme} {...props}>
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button
        className="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
        aria-label="Theme"
      >
        <LightIcon
          className={clsx(
            "h-4 w-4 dark:hidden",
            theme === "system" ? "fill-slate-400" : "fill-sky-400",
          )}
        />
        <DarkIcon
          className={clsx(
            "hidden h-4 w-4 dark:block",
            theme === "system" ? "fill-slate-400" : "fill-sky-400",
          )}
        />
      </Listbox.Button>
      <Listbox.Options className="absolute left-1/2 top-full mt-3 w-36 -translate-x-1/2 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
        {themes.map((theme) => (
          <Listbox.Option
            key={theme.value}
            value={theme.value}
            className={({ active, selected }) =>
              clsx(
                "flex cursor-pointer select-none items-center rounded-[0.625rem] p-1",
                {
                  "text-sky-500": selected,
                  "text-slate-900 dark:text-white": active && !selected,
                  "text-slate-700 dark:text-slate-400": !active && !selected,
                  "bg-slate-100 dark:bg-slate-900/40": active,
                },
              )
            }
          >
            {({ selected }) => (
              <>
                <div className="rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">
                  <theme.icon
                    className={clsx(
                      "h-4 w-4",
                      selected
                        ? "fill-sky-400 dark:fill-sky-400"
                        : "fill-slate-400",
                    )}
                  />
                </div>
                <div className="ml-3">{theme.name}</div>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
