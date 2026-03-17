import { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import type { CommitDetail } from '../services/github'
import { useLanguage } from '../context/LanguageContext'

interface CommitListProps {
  commits: CommitDetail[]
}

const MAX_COMMITS = 8
const MAX_FILES = 5

function CommitItem({ commit }: { commit: CommitDetail }) {
  const [filesExpanded, setFilesExpanded] = useState(false)
  const { t } = useLanguage()
  const needsFilesTruncation = commit.files.length > MAX_FILES
  const displayFiles = filesExpanded ? commit.files : commit.files.slice(0, MAX_FILES)

  return (
    <div className="border-l-2 border-gray-200 dark:border-gray-600 pl-4 py-2">
      <p className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-1">
        {commit.sha.slice(0, 7)}
      </p>
      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{commit.message}</p>
      <div className="mt-2 space-y-2">
        {displayFiles.map((file) =>
          file.patch ? (
            <CodeBlock key={file.filename} code={file.patch} filename={file.filename} />
          ) : null
        )}
        {needsFilesTruncation && (
          <button
            onClick={() => setFilesExpanded(!filesExpanded)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {filesExpanded
              ? t("files.showFewer")
              : t("files.showMore", { count: commit.files.length - MAX_FILES })}
          </button>
        )}
      </div>
    </div>
  )
}

export function CommitList({ commits }: CommitListProps) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useLanguage()
  const needsTruncation = commits.length > MAX_COMMITS
  const displayCommits = expanded ? commits : commits.slice(0, MAX_COMMITS)

  return (
    <div className="space-y-4">
      {displayCommits.map((commit) => (
        <CommitItem key={commit.sha} commit={commit} />
      ))}
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {expanded
            ? t("commits.showFewer")
            : t("commits.showMore", { count: commits.length - MAX_COMMITS })}
        </button>
      )}
    </div>
  )
}
