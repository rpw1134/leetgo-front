import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ProblemResponse } from "../../types";
import type { Difficulty } from "../../types/sandbox";

interface ProblemDescriptionProps {
  problem: ProblemResponse;
  difficulty: Difficulty;
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: "text-green-400 bg-green-400/10 border-green-400/20",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

export const ProblemDescription = ({
  problem,
  difficulty,
}: ProblemDescriptionProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header: title + difficulty */}
      <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3 mb-1">
          <span
            className={`
              text-xs font-raleway font-semibold px-2.5 py-0.5 rounded-full border capitalize
              ${DIFFICULTY_STYLES[difficulty]}
            `}
          >
            {difficulty}
          </span>
        </div>
        <h1 className="font-raleway text-xl text-white/95 font-semibold mt-2 leading-tight">
          {problem.title}
        </h1>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-slate-700">
        {/* Description as markdown */}
        <div className="stream-markdown font-raleway text-sm text-slate-300 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {problem.description}
          </ReactMarkdown>
        </div>

        {/* Constraints */}
        {problem.problem_constraints.length > 0 && (
          <div className="mt-5">
            <h3 className="font-raleway text-sm font-semibold text-white/80 mb-2">
              Constraints
            </h3>
            <ul className="space-y-1">
              {problem.problem_constraints.map((constraint) => (
                <li
                  key={constraint.id}
                  className="font-raleway text-sm text-slate-400 flex items-start gap-2"
                >
                  <span className="text-leetgo-primary mt-0.5 flex-shrink-0">
                    &bull;
                  </span>
                  <code className="text-xs bg-slate-800/50 border border-slate-700/30 rounded px-1.5 py-0.5 text-slate-300">
                    {constraint.constraint}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Example test cases */}
        {problem.test_cases.length > 0 && (
          <div className="mt-5">
            <h3 className="font-raleway text-sm font-semibold text-white/80 mb-3">
              Examples
            </h3>
            <div className="space-y-3">
              {problem.test_cases.map((tc, idx) => (
                <div
                  key={tc.id}
                  className="rounded-lg bg-slate-900/50 border border-slate-800/40 p-3.5"
                >
                  <p className="font-raleway text-xs text-slate-500 font-medium mb-2">
                    Example {idx + 1}
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <span className="font-raleway text-xs text-slate-500 flex-shrink-0 w-14">
                        Input:
                      </span>
                      <code className="font-mono text-xs text-slate-300 break-all">
                        {tc.test_case_input}
                      </code>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-raleway text-xs text-slate-500 flex-shrink-0 w-14">
                        Output:
                      </span>
                      <code className="font-mono text-xs text-leetgo-bright/80 break-all">
                        {tc.test_case_output}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
