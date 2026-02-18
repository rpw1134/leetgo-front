import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ProblemResponse } from "../../types";
import type { Difficulty } from "../../types/sandbox";

interface ProblemDescriptionProps {
  problem: ProblemResponse;
  difficulty: Difficulty;
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  hard: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

export const ProblemDescription = ({
  problem,
  difficulty,
}: ProblemDescriptionProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <h1 className="font-raleway text-2xl text-white/90 font-semibold leading-snug">
            {problem.title}
          </h1>
          <span
            className={`
              text-sm font-raleway font-bold px-3 py-0.5 rounded-full border capitalize tracking-wide
              ${DIFFICULTY_STYLES[difficulty]}
            `}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-thumb-slate-700">
        <div className="stream-markdown font-raleway text-[17px] text-slate-300/90 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {problem.description}
          </ReactMarkdown>
        </div>

        {/* Constraints */}
        {problem.problem_constraints.length > 0 && (
          <div className="mt-6">
            <h3 className="font-raleway text-base font-semibold text-slate-400 tracking-widest uppercase mb-3">
              Constraints
            </h3>
            <ul className="space-y-2">
              {problem.problem_constraints.map((constraint) => (
                <li
                  key={constraint.id}
                  className="font-raleway text-[17px] text-slate-400 flex items-start gap-2"
                >
                  <span className="text-leetgo-primary/60 mt-px flex-shrink-0">
                    &bull;
                  </span>
                  <code className="font-mono text-base bg-white/[0.03] border border-white/[0.06] rounded px-2 py-0.5 text-slate-300/80">
                    {constraint.constraint}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples */}
        {problem.test_cases.length > 0 && (
          <div className="mt-6">
            <h3 className="font-raleway text-base font-semibold text-slate-400 tracking-widest uppercase mb-3">
              Examples
            </h3>
            <div className="space-y-3">
              {problem.test_cases.map((tc, idx) => (
                <div
                  key={tc.id}
                  className="rounded-md bg-white/[0.02] border border-white/[0.05] p-4"
                >
                  <p className="font-raleway text-sm text-slate-500 font-semibold tracking-widest uppercase mb-2.5">
                    Example {idx + 1}
                  </p>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span className="font-raleway text-base text-slate-500 flex-shrink-0 w-16">
                        Input
                      </span>
                      <code className="font-mono text-base text-slate-300/80 break-all">
                        {tc.test_case_input}
                      </code>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-raleway text-base text-slate-500 flex-shrink-0 w-16">
                        Output
                      </span>
                      <code className="font-mono text-base text-leetgo-primary/70 break-all">
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
