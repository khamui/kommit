import { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { PRCard } from "./PRCard";
import { FilterBar } from "./FilterBar";
import {
  fetchMergedPRs,
  fetchPRCommits,
  fetchCommitDetail,
  RateLimitError,
  type PullRequest,
  type CommitDetail,
} from "../services/github";
import { RateLimitToast } from "./RateLimitToast";

interface PRWithCommits {
  pr: PullRequest;
  commits: CommitDetail[];
}

const LANGUAGES = ["TypeScript", "JavaScript", "Nix", "Lua"];

function parseRepoFromUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

export function PRFeed() {
  const [prs, setPrs] = useState<PRWithCommits[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadPRs = useCallback(
    async (pageNum: number, languages: string[], append: boolean) => {
      if (loading) return;
      setLoading(true);

      try {
        const newPRs = await fetchMergedPRs(pageNum, 10, languages);
        if (newPRs.length === 0) {
          setHasMore(false);
          return;
        }

        const prsWithCommits = await Promise.all(
          newPRs.map(async (pr) => {
            const repoInfo = parseRepoFromUrl(pr.html_url);
            if (!repoInfo) return { pr, commits: [] };

            try {
              const commits = await fetchPRCommits(
                repoInfo.owner,
                repoInfo.repo,
                pr.number,
              );
              const commitDetails = await Promise.all(
                commits.map((c) =>
                  fetchCommitDetail(repoInfo.owner, repoInfo.repo, c.sha),
                ),
              );
              return { pr, commits: commitDetails };
            } catch {
              return { pr, commits: [] };
            }
          }),
        );

        if (append) {
          setPrs((prev) => {
            const existingUrls = new Set(prev.map((p) => p.pr.html_url));
            const uniqueNew = prsWithCommits.filter(
              (p) => !existingUrls.has(p.pr.html_url),
            );
            return [...prev, ...uniqueNew];
          });
        } else {
          setPrs(prsWithCommits);
        }
        setPage(pageNum + 1);
      } catch (err) {
        if (err instanceof RateLimitError) {
          toast(
            (t) => (
              <RateLimitToast retryAfter={err.retryAfter} toastId={t.id} />
            ),
            {
              duration: err.retryAfter * 1000,
              className: "dark:!bg-gray-800 dark:!text-gray-100",
            },
          );
        } else {
          toast.error(
            err instanceof Error ? err.message : "Failed to load PRs",
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  // Initial load and filter change
  useEffect(() => {
    setPrs([]);
    setPage(1);
    setHasMore(true);
    loadPRs(1, selectedLanguages, false);
  }, [selectedLanguages]); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore && page > 1) {
          loadPRs(page, selectedLanguages, true);
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [page, loading, hasMore, selectedLanguages, loadPRs]);

  return (
    <div className="space-y-6">
      <FilterBar
        languages={LANGUAGES}
        selected={selectedLanguages}
        onChange={setSelectedLanguages}
      />
      {prs.map(({ pr, commits }) => (
        <PRCard key={pr.html_url} pr={pr} commits={commits} />
      ))}
      <div ref={loaderRef} className="py-8 flex justify-center">
        {loading && (
          <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin" />
        )}
        {!hasMore && prs.length > 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No more pull requests
          </p>
        )}
        {!loading && !hasMore && prs.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No recent pull requests found
          </p>
        )}
      </div>
    </div>
  );
}
