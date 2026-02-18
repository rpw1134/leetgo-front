import { ProblemDescription } from "./ProblemDescription";
import { CodeEditor } from "./CodeEditor";
import { TestCasesPanel } from "./TestCasesPanel";
import type { ProblemResponse } from "../../types";
import type { ProgrammingLanguage, Difficulty } from "../../types/sandbox";

interface ProblemWorkspaceProps {
  problem: ProblemResponse;
  difficulty: Difficulty;
  language: ProgrammingLanguage;
  code: string;
  onCodeChange: (value: string) => void;
}

export const ProblemWorkspace = ({
  problem,
  difficulty,
  language,
  code,
  onCodeChange,
}: ProblemWorkspaceProps) => {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-2.5">
      {/* Left: Problem description */}
      <div className="workspace-panel rounded-lg overflow-hidden min-h-0">
        <ProblemDescription problem={problem} difficulty={difficulty} />
      </div>

      {/* Right: Editor + Test Cases */}
      <div className="flex flex-col gap-2.5 min-h-0">
        <div className="workspace-panel rounded-lg overflow-hidden flex-[3] min-h-0">
          <CodeEditor
            language={language}
            code={code}
            onCodeChange={onCodeChange}
          />
        </div>

        <div className="workspace-panel rounded-lg overflow-hidden flex-[2] min-h-0">
          <TestCasesPanel testCases={problem.test_cases} />
        </div>
      </div>
    </div>
  );
};
