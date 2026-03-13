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
          Angular and React expert. Solving real problems with strong user
          oriented designs. Writing production level code. Proficient in
          fullstack development. Includes writing own tools, automating
          continuous integration, testing relevant components and tailoring to
          run in any infrastructure. Also experimenting with agentic
          engineering.
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
                : Developing a Management Dashboard to leverage Atlassian
                Confluence Data Center to be used across multiple institutions.
                Over 30 universities in Bavaria are participating.
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Providing a platform for IT Managers and Administrators of
                  different institutions to manage their{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Atlassian Confluence Data Center
                  </span>{" "}
                  organization.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Professional
                </strong>
                : Extending CMDB (Configuration Management Database) with
                crucial functionalities to improve IT expert's work to organize
                the data center's configuration items.
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Using frontend latest best practices, for instance{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Signals API
                  </span>
                  , custom directives & custom pipes,{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Resource API
                  </span>{" "}
                  to make the web application future proof. Simplifying the
                  codebase to make it easier to maintain (updates and issues)
                  and faster to extend.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Professional
                </strong>
                : Implementing a Design system with PrimeNG themes for CMDB, to
                improve visuality for the sheer amount of information. Further
                the performance is maxed out, as we avoid transitions and delays
                and only import CSS which is used.
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Declutter different styling paradigms, such as Material,
                  Bootstrap, PrimeNG, to use only one, which{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    reduces complexity
                  </span>{" "}
                  and makes things easier to update and maintain. The new system
                  relies on PrimeNG Themes (v19+) and integrates TailwindCSS as
                  utility framework nicely.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Professional
                </strong>
                : Making all web applications more robust and future proof.
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → I prefer to use the{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    ECMAScript Language Spec API
                  </span>
                  , rather than installing many third party libraries. This
                  improves security and maintainability as Open Source libraries
                  should be consumed with care. Functionality which relies on
                  deprecated packages can lead to update stagnation. Evaluate
                  the vitals of a library helps and refactor code, by using the
                  specification functionality over third party libraries is
                  preferable.
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  Personal
                </strong>
                : Implementing and running a Q&A platform for pet owners.
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → Coming soon:{" "}
                  <a
                    href="https://www.helpa.ws"
                    className="underline hover:text-blue-500"
                  >
                    www.helpa.ws
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
