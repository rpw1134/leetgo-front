import type { Monaco } from "@monaco-editor/react";

export const LEETGO_THEME_NAME = "leetgo-dark";

/** Register a custom Monaco theme that matches the app's slate palette */
export function defineMonacoTheme(monaco: Monaco) {
  monaco.editor.defineTheme(LEETGO_THEME_NAME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "5a6578", fontStyle: "italic" },
      { token: "keyword", foreground: "c792ea" },
      { token: "string", foreground: "c3e88d" },
      { token: "number", foreground: "f78c6c" },
      { token: "type", foreground: "ffcb6b" },
      { token: "function", foreground: "82aaff" },
      { token: "variable", foreground: "d6deeb" },
    ],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#cbd5e1",
      "editor.lineHighlightBackground": "#12182080",
      "editor.selectionBackground": "#1a2a3a80",
      "editor.inactiveSelectionBackground": "#1a2a3a40",
      "editorLineNumber.foreground": "#3a4456",
      "editorLineNumber.activeForeground": "#5a6578",
      "editorCursor.foreground": "#00eb17",
      "editorIndentGuide.background": "#1a1f2a",
      "editorIndentGuide.activeBackground": "#252c3a",
      "editorGutter.background": "#0d1117",
      "editor.selectionHighlightBackground": "#1a2a3a40",
      "editorWidget.background": "#12161d",
      "editorWidget.border": "#1a1f2a",
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.background": "#252c3a80",
      "scrollbarSlider.hoverBackground": "#3a445680",
      "scrollbarSlider.activeBackground": "#5a657880",
    },
  });
}
