import { Editor } from "@monaco-editor/react";

export default function Sandbox() {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center bg-black">
      <h1 className="text-white text-4xl">Sandbox Page</h1>
      <Editor
        height="50vh"
        width="50vw"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue="// Start coding your signup logic here"
        options={{
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          parameterHints: { enabled: false },
          hover: { enabled: false },
          autoClosingBrackets: "never",
          autoClosingQuotes: "never",
          formatOnType: false,
          formatOnPaste: false,
          tabCompletion: "off",
          inlineSuggest: { enabled: false },
          minimap: { enabled: false },
          scrollbar: { vertical: "auto" },
          renderLineHighlight: "line",
          overviewRulerLanes: 0,
        }}
      />
    </div>
  );
}
