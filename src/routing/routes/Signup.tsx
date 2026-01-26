import { Editor } from "@monaco-editor/react";

export const Signup: React.FC = () => {
  return (
    <div className="bg-green-600 w-screen h-screen flex flex-row justify-center items-center">
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
};
