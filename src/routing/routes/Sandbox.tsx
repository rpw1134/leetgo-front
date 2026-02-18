import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ConfigPanel } from "../../components/sandbox/ConfigPanel";
import { StreamWindow } from "../../components/sandbox/StreamWindow";
import { ChatBar } from "../../components/sandbox/ChatBar";
import { ProblemWorkspace } from "../../components/sandbox/ProblemWorkspace";
import { DEFAULT_SANDBOX_CONFIG } from "../../types/sandbox";
import type { SandboxConfig, SandboxPhase } from "../../types/sandbox";
import type { ProblemResponse } from "../../types";
import { generateProblemStream } from "../../utils/api/problems";

export default function Sandbox() {
  const [config, setConfig] = useState<SandboxConfig>(DEFAULT_SANDBOX_CONFIG);
  const [streamContent, setStreamContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [phase, setPhase] = useState<SandboxPhase>("config");
  const [completeProblem, setCompleteProblem] =
    useState<ProblemResponse | null>(null);
  const [code, setCode] = useState("");
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleConfigChange = useCallback(
    (updates: Partial<SandboxConfig>) => {
      setConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  const beginTransition = useCallback((problem: ProblemResponse) => {
    setCompleteProblem(problem);
    setCode(problem.generalized_function_signature ?? "");

    // Phase 1: fade out the stream
    setPhase("transitioning");

    // Phase 2: after stream fades, show workspace
    transitionTimer.current = setTimeout(() => {
      setPhase("workspace");
    }, 450);
  }, []);

  const handleSubmit = async (message: string) => {
    setPhase("streaming");
    setStreamContent("");
    setIsStreaming(true);
    setCompleteProblem(null);

    if (transitionTimer.current) clearTimeout(transitionTimer.current);

    let finalProblem: ProblemResponse | null = null;

    const payload = {
      creator_email: "ryanw1134@gmail.com",
      user_prompt: message,
      ...config,
      model_provider: "openai",
    };

    await generateProblemStream(
      payload,
      (chunk) => {
        if (chunk.is_final && chunk.complete_problem) {
          finalProblem = chunk.complete_problem;
        }
        if (chunk.content) {
          setStreamContent((prev) => prev + chunk.content);
        }
      },
      () => {
        setIsStreaming(false);
        if (finalProblem) {
          setTimeout(() => beginTransition(finalProblem!), 500);
        }
      },
      (error) => {
        console.error("Stream error:", error);
        setIsStreaming(false);
      },
    );
  };

  return (
    <div className="h-screen w-full bg-slate-950 overflow-hidden flex flex-col">
      <div className="fixed inset-0 sandbox-bg pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-6 sm:px-8 xl:px-12 py-4 xl:py-5">
          <Link
            to="/"
            className="group flex items-center gap-0.5 opacity-40 hover:opacity-70 transition-opacity"
          >
            <span className="font-eb-garamond text-lg xl:text-xl text-white">
              &lt;
            </span>
            <span className="font-eb-garamond text-lg xl:text-xl text-white/50">
              /
            </span>
            <span className="font-eb-garamond text-lg xl:text-xl text-white">
              &gt;
            </span>
          </Link>

          <Link
            to="/profile"
            className="text-xs xl:text-sm font-raleway text-slate-600 hover:text-slate-400 transition-colors tracking-wide"
          >
            Profile
          </Link>
        </header>

        {/* Content area */}
        <div className="flex-1 min-h-0 px-4 sm:px-6 xl:px-8 pb-2">
          {/* Config */}
          {phase === "config" && (
            <div className="h-full flex items-center justify-center pb-4">
              <div className="w-full max-w-xl xl:max-w-2xl">
                <ConfigPanel
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </div>
            </div>
          )}

          {/* Streaming — centered markdown */}
          {(phase === "streaming" || phase === "transitioning") && (
            <div
              className={`h-full overflow-y-auto pb-4 ${
                phase === "transitioning" ? "stream-fade-out" : ""
              }`}
            >
              <div className="w-full max-w-3xl xl:max-w-4xl mx-auto">
                <StreamWindow
                  content={streamContent}
                  isStreaming={isStreaming}
                />
              </div>
            </div>
          )}

          {/* Workspace — description + editor + test cases */}
          {phase === "workspace" && completeProblem && (
            <div className="h-full workspace-enter">
              <ProblemWorkspace
                problem={completeProblem}
                difficulty={config.difficulty}
                language={config.language}
                code={code}
                onCodeChange={setCode}
              />
            </div>
          )}
        </div>

        {/* Chat bar — config & streaming only */}
        {(phase === "config" || phase === "streaming") && (
          <div className="flex-shrink-0 pb-8 xl:pb-10 pt-2">
            <ChatBar onSubmit={handleSubmit} disabled={isStreaming} />
          </div>
        )}
      </div>
    </div>
  );
}
