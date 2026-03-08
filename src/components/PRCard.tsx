import { CommitList } from './CommitList'
import type { PullRequest, CommitDetail } from '../services/github'

interface PRCardProps {
  pr: PullRequest
  commits: CommitDetail[]
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PRCard({ pr, commits }: PRCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <time className="text-sm text-gray-500 dark:text-gray-400">{formatDate(pr.merged_at)}</time>
      <h2 className="text-xl font-semibold mt-1 mb-2">
        <a
          href={pr.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          {pr.title}
        </a>
      </h2>
      {pr.body && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{pr.body}</p>
      )}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {commits.length} commit{commits.length !== 1 ? 's' : ''}
        </h3>
        <CommitList commits={commits} />
      </div>
    </article>
  )
}
