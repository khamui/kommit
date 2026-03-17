import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { PRFeed } from "./components/PRFeed";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { config } from "./config";

function AppContent() {
  const [areasExpanded, setAreasExpanded] = useState(false);
  const { t } = useLanguage();

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
                {t("header.title")}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-400 mb-[2rem]">
          {t("header.bio")}
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
            {t("header.projectsToggle")}
          </button>
          {areasExpanded && (
            <ul className="mt-3 ml-6 space-y-3 text-gray-800 dark:text-gray-300 list-disc text-sm">
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  {t("labels.professional")}
                </strong>
                : {t("projects.dashboard")}
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → {t("projects.dashboardDetail")}{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Atlassian Confluence Data Center
                  </span>{" "}
                  {t("projects.dashboardDetailEnd")}
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  {t("labels.professional")}
                </strong>
                : {t("projects.cmdb")}
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → {t("projects.cmdbDetail")}{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Signals API
                  </span>
                  , custom directives & custom pipes,{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    Resource API
                  </span>{" "}
                  {t("projects.cmdbDetailEnd")}
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  {t("labels.professional")}
                </strong>
                : {t("projects.designSystem")}
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → {t("projects.designSystemDetail")}{" "}
                  <span className="text-gray-700 dark:text-gray-400">
                    {t("projects.reducesComplexity")}
                  </span>{" "}
                  {t("projects.designSystemDetailEnd")}
                </span>
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-200">
                  {t("labels.personal")}
                </strong>
                : {t("projects.helpa")}
                <br />
                <span className="text-gray-500 dark:text-gray-500">
                  → {t("projects.helpaDetail")}{" "}
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
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
