function getRequiredEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  github: {
    username: getRequiredEnv("VITE_GITHUB_USERNAME"),
  },
  api: {
    baseUrl: getRequiredEnv("VITE_API_URL"),
  },
  textContent: {
    mainTitle: "Kha Tran",
    pronouns: "(he/him)",
    role: "Senior Frontend Developer",
    shortIntro:
      "Angular and React expert. Proficient in fullstack development. Experimenting with agentic engineering.",
  },
};
