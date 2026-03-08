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
            <ul className="mt-3 ml-6 space-y-3 text-gray-700 dark:text-gray-400 list-disc text-sm">
              <li>
                Professional: Modernizing legacy{" "}
                <strong className="text-gray-900 dark:text-gray-200">
                  Angular (v20+)
                </strong>{" "}
                app
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Signals, custom directives & pipes, standalone components to
                  make it future proof. Also simplifying the codebase to make
                  more accessible to other developers.
                </span>
              </li>
              <li>
                Professional: Design system with{" "}
                <strong className="text-gray-900 dark:text-gray-200">
                  PrimeNG (v19+)
                </strong>{" "}
                theming
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Integrating into legacy codebase and reduce complexity of
                  different CSS paradigms as component libraries, utility
                  frameworks vs BEM pattern.
                </span>
              </li>
              <li>
                Professional: Dependency reduction
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Prefering to use specification build-ins, rather than
                  installing many libraries. Easier maintenance, faster upgrades
                </span>
              </li>
              <li>
                Professional: Multi-org management dashboard for Atlassian
                Confluence (Data Center)
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Built from scratch and communicates with confluence and
                  custom REST API backend.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Personal: Fullstack
                </strong>{" "}
                Q&A platform for pet owners
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
