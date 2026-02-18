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
      {/* Tabs */}
      <div className="flex-shrink-0 flex items-center gap-1 px-4 pt-2.5 pb-0 border-b border-slate-800/60">
        {testCases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`
              font-raleway text-xs font-medium px-3 py-1.5 rounded-t-md transition-colors
              ${
                idx === activeTab
                  ? "text-leetgo-bright bg-slate-800/40 border-b-2 border-leetgo-bright"
                  : "text-slate-500 hover:text-slate-400"
              }
            `}
          >
            Case {idx + 1}
          </button>
        ))}
      </div>

      {/* Active test case content */}
      {activeCase && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
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
    <p className="font-raleway text-xs text-slate-500 font-medium mb-1.5">
      {label}
    </p>
    <div className="bg-slate-900/60 border border-slate-800/40 rounded-md px-3 py-2">
      <code className="font-mono text-xs text-slate-300 whitespace-pre-wrap break-all">
        {value}
      </code>
    </div>
  </div>
);
