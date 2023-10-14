import clsx from "clsx"
import path from "path"
import shiki from "shiki"

async function highlight(code: string, lang: string) {
  const themePath = path.join(process.cwd(), "src/config/tokyonight.json")
  const highlighter = await shiki.getHighlighter({
    theme: await shiki.loadTheme(themePath),
  })

  try {
    return highlighter.codeToThemedTokens(code, lang)
  } catch (error) {
    return []
  }
}

export interface HighlightProps {
  code: string
  lang: string
  className?: string
}

export async function Highlight({ code, lang, className }: HighlightProps) {
  const output = await highlight(code, lang)

  return (
    <pre className={clsx("flex overflow-x-auto", className)}>
      <code className="grid">
        {output.map((line, i) => (
          <span key={i}>
            {line.map((token, j) => (
              <span key={j} style={{ color: token.color }}>
                {token.content}
              </span>
            ))}
          </span>
        ))}
      </code>
    </pre>
  )
}
