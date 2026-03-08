import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'
import { useTheme } from '../context/ThemeContext'

interface CodeBlockProps {
  code: string
  filename: string
}

const MAX_LINES = 20

function getLanguageFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const langMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    py: 'python',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    java: 'java',
    kt: 'kotlin',
    swift: 'swift',
    css: 'css',
    scss: 'scss',
    html: 'html',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    md: 'markdown',
    sql: 'sql',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
  }
  return langMap[ext] || 'text'
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const [html, setHtml] = useState<string>('')
  const { resolvedTheme } = useTheme()

  const lines = code.split('\n')
  const needsTruncation = lines.length > MAX_LINES
  const displayCode = expanded ? code : lines.slice(0, MAX_LINES).join('\n')

  useEffect(() => {
    const lang = getLanguageFromFilename(filename)
    const shikiTheme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light'
    codeToHtml(displayCode, {
      lang,
      theme: shikiTheme,
    }).then(setHtml)
  }, [displayCode, filename, resolvedTheme])

  return (
    <div className="mt-2 rounded border border-gray-200 dark:border-gray-600">
      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 font-mono">
        {filename}
      </div>
      <div
        className={`overflow-auto text-sm [&_pre]:p-3 [&_pre]:m-0 ${!expanded && needsTruncation ? 'max-h-[500px]' : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-gray-100 dark:bg-gray-700 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {expanded ? 'Collapse' : `Expand (${lines.length - MAX_LINES} more lines)`}
        </button>
      )}
    </div>
  )
}
