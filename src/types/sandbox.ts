/** Available AI models for problem generation */
export type AIModel = "gpt-4o" | "gpt-4o-mini";

/** Supported programming languages */
export type ProgrammingLanguage = "python" | "java" | "javascript";

/** Problem difficulty levels */
export type Difficulty = "easy" | "medium" | "hard";

/** Problem category types */
export type ProblemType = "arrays-strings" | "graphs";

/** Grouped sandbox configuration state */
export interface SandboxConfig {
  model: AIModel;
  language: ProgrammingLanguage;
  difficulty: Difficulty;
  problemType: ProblemType;
}

/** Label mappings for display purposes */
export const MODEL_LABELS: Record<AIModel, string> = {
  "gpt-4o": "GPT-4o",
  "gpt-4o-mini": "GPT-4o Mini",
};

export const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
  python: "Python",
  java: "Java",
  javascript: "JavaScript",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
  "arrays-strings": "Arrays & Strings",
  graphs: "Graphs",
};

/** Default sandbox configuration */
export const DEFAULT_SANDBOX_CONFIG: SandboxConfig = {
  model: "gpt-4o",
  language: "python",
  difficulty: "medium",
  problemType: "arrays-strings",
};
