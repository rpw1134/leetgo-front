import Editor from "@monaco-editor/react";
import type { ProgrammingLanguage } from "../../types/sandbox";
import { MONACO_LANGUAGE_MAP } from "../../types/sandbox";
import { defineMonacoTheme, LEETGO_THEME_NAME } from "../../utils/monacoTheme";

interface CodeEditorProps {
  language: ProgrammingLanguage;
  code: string;
  onCodeChange: (value: string) => void;
}

export const CodeEditor = ({ language, code, onCodeChange }: CodeEditorProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Editor header */}
      <div className="flex-shrink-0 flex items-center px-4 py-2 border-b border-white/[0.06]">
        <span className="font-raleway text-sm text-slate-500 font-medium tracking-widest uppercase">
          {language}
        </span>
      </div>

      {/* Monaco editor */}
      <div className="flex-1 min-h-0">
        <Editor
          language={MONACO_LANGUAGE_MAP[language]}
          value={code}
          onChange={(value) => onCodeChange(value ?? "")}
          theme={LEETGO_THEME_NAME}
          beforeMount={defineMonacoTheme}
          options={{
            fontSize: 15,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 14, bottom: 14 },
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            tabSize: language === "python" ? 4 : 2,
            automaticLayout: true,
            wordWrap: "on",
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            overviewRulerLanes: 0,
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
              useShadows: false,
            },
          }}
        />
      </div>
    </div>
  );
};
