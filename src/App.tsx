import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { PRFeed } from "./components/PRFeed";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { config } from "./config";

function AppContent() {
  const [areasExpanded, setAreasExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-5">
      <header className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={`https://github.com/${config.github.username}.png`}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            <div className="leading-[1.8]">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                Kha Tran <span className="text-xl text-gray-400">(he/him)</span>
              </h1>
              <h2 className="text-xl dark:text-gray-300">
                Senior Frontend Developer
              </h2>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-400 mb-[2rem]">
          Angular and React expert. Proficient in fullstack development.
          Experimenting with agentic engineering.
        </p>
        <div>
          <button
            onClick={() => setAreasExpanded(!areasExpanded)}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <svg
              className={`w-4 h-4 transition-transform ${areasExpanded ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            Current projects I am working on...
          </button>
          {areasExpanded && (
            <ul className="mt-3 ml-6 space-y-3 text-gray-800 dark:text-gray-300 list-disc text-sm">
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Professional
                </strong>
                : Modernizing legacy to recent versions of Angular (v20+)
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  →{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Signals
                  </span>
                  , custom directives,{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Resource API
                  </span>{" "}
                  to make it future proof. Also simplifying the codebase to make
                  it more accessible to other developers.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Professional
                </strong>
                : Design system with PrimeNG (v19+) theming
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Integrating into legacy codebase and{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    reduce complexity
                  </span>{" "}
                  of different CSS paradigms as component libraries, utility
                  frameworks vs BEM pattern.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Professional
                </strong>
                : Dependency reduction
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Prefering to use{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    ECMAScript Language Spec API
                  </span>
                  , rather than installing many libraries. Easier maintenance,
                  faster upgrades
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Professional
                </strong>
                : Multi-org management dashboard to support managing Atlassian
                Confluence (Data Center).
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Built from scratch and communicates with{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Atlassian Confluence
                  </span>{" "}
                  instances and custom REST API backend.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Personal
                </strong>
                : Fullstack Q&A platform for pet owners
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Coming soon:{" "}
                  <a
                    href="https://www.helpa.ws"
                    className="underline hover:text-blue-500"
                  >
                    helpa.ws
                  </a>
                </span>
              </li>
            </ul>
          )}
        </div>
      </header>
      <main className="mt-[3rem]">
        <PRFeed />
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
