import { CodeEditor } from "./CodeEditor";
import { TestCasesPanel } from "./TestCasesPanel";
import type { ProblemResponse } from "../../types";
import type { ProgrammingLanguage } from "../../types/sandbox";

interface ProblemWorkspaceProps {
  problem: ProblemResponse;
  language: ProgrammingLanguage;
  code: string;
  onCodeChange: (value: string) => void;
}

const panelStyle = {
  background: "rgba(12, 15, 20, 0.85)",
  border: "1px solid rgba(90, 101, 120, 0.1)",
};

export const ProblemWorkspace = ({
  problem,
  language,
  code,
  onCodeChange,
}: ProblemWorkspaceProps) => {
  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      {/* Code editor — takes ~60% */}
      <div
        className="rounded-xl overflow-hidden flex-[3] min-h-0"
        style={panelStyle}
      >
        <CodeEditor
          language={language}
          code={code}
          onCodeChange={onCodeChange}
        />
      </div>

      {/* Test cases — takes ~40% */}
      <div
        className="rounded-xl overflow-hidden flex-[2] min-h-0"
        style={panelStyle}
      >
        <TestCasesPanel testCases={problem.test_cases} />
      </div>
    </div>
  );
};
