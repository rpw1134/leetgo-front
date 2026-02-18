import { useState } from "react";
import type { TestCase } from "../../types";

interface TestCasesPanelProps {
  testCases: TestCase[];
}

export const TestCasesPanel = ({ testCases }: TestCasesPanelProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeCase = testCases[activeTab];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex-shrink-0 flex items-center gap-1 px-4 pt-2.5 border-b border-white/[0.06]">
        {testCases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`
              font-raleway text-base font-medium px-3.5 py-2 rounded-t transition-colors
              ${
                idx === activeTab
                  ? "text-leetgo-primary bg-white/[0.04]"
                  : "text-slate-500 hover:text-slate-400"
              }
            `}
          >
            Case {idx + 1}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeCase && (
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
          <TestCaseField label="Input" value={activeCase.test_case_input} />
          <TestCaseField
            label="Expected Output"
            value={activeCase.test_case_output}
          />
        </div>
      )}
    </div>
  );
};

interface TestCaseFieldProps {
  label: string;
  value: string;
}

const TestCaseField = ({ label, value }: TestCaseFieldProps) => (
  <div>
    <p className="font-raleway text-sm text-slate-500 font-semibold tracking-widest uppercase mb-2">
      {label}
    </p>
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-md px-4 py-2.5">
      <code className="font-mono text-base text-slate-300/80 whitespace-pre-wrap break-all">
        {value}
      </code>
    </div>
  </div>
);
