import Editor from "@monaco-editor/react";
import type { ProgrammingLanguage } from "../../types/sandbox";
import { MONACO_LANGUAGE_MAP } from "../../types/sandbox";

interface CodeEditorProps {
  language: ProgrammingLanguage;
  code: string;
  onCodeChange: (value: string) => void;
}

export const CodeEditor = ({ language, code, onCodeChange }: CodeEditorProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Editor header bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-slate-800/60">
        <span className="font-raleway text-xs text-slate-500 font-medium tracking-wide uppercase">
          {language}
        </span>
      </div>

      {/* Monaco editor */}
      <div className="flex-1 min-h-0">
        <Editor
          language={MONACO_LANGUAGE_MAP[language]}
          value={code}
          onChange={(value) => onCodeChange(value ?? "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 8,
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            smoothScrolling: true,
            tabSize: language === "python" ? 4 : 2,
            automaticLayout: true,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};
