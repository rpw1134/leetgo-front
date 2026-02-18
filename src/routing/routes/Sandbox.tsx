import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ConfigPanel } from "../../components/sandbox/ConfigPanel";
import { StreamWindow } from "../../components/sandbox/StreamWindow";
import { ChatBar } from "../../components/sandbox/ChatBar";
import { ProblemDescription } from "../../components/sandbox/ProblemDescription";
import { ProblemWorkspace } from "../../components/sandbox/ProblemWorkspace";
import { DEFAULT_SANDBOX_CONFIG } from "../../types/sandbox";
import type { SandboxConfig, SandboxPhase } from "../../types/sandbox";
import type { ProblemResponse } from "../../types";
import { generateProblemStream } from "../../utils/api/problems";

const TRANSITION_DURATION = 700;

export default function Sandbox() {
  const [config, setConfig] = useState<SandboxConfig>(DEFAULT_SANDBOX_CONFIG);
  const [streamContent, setStreamContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [phase, setPhase] = useState<SandboxPhase>("config");
  const [completeProblem, setCompleteProblem] =
    useState<ProblemResponse | null>(null);
  const [code, setCode] = useState("");
  const [chatBarExiting, setChatBarExiting] = useState(false);
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
    setChatBarExiting(true);

    // Start slide-left + slide-up via CSS class
    setPhase("transitioning");

    // After the CSS transition finishes, swap to the full workspace
    transitionTimer.current = setTimeout(() => {
      setPhase("workspace");
      setChatBarExiting(false);
    }, TRANSITION_DURATION + 100);
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
          // Brief pause so the user sees the completed stream
          setTimeout(() => beginTransition(finalProblem!), 600);
        }
      },
      (error) => {
        console.error("Stream error:", error);
        setIsStreaming(false);
      },
    );
  };

  const isSplit = phase === "transitioning" || phase === "workspace";
  const showChatBar =
    (phase === "config" || phase === "streaming" || phase === "transitioning") &&
    !chatBarExiting;
  const showExitingChatBar = chatBarExiting;

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
          {/* Config phase */}
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

          {/* Streaming / Transitioning / Workspace — persistent flex layout */}
          {phase !== "config" && (
            <div className={`h-full flex gap-3 ${isSplit ? "sandbox-split" : ""}`}>
              {/* Left: stream text slides left, then swaps to structured description */}
              <div className="sandbox-left-panel h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                {phase === "workspace" && completeProblem ? (
                  <div
                    className="description-enter h-full rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(12, 15, 20, 0.85)",
                      border: "1px solid rgba(90, 101, 120, 0.1)",
                    }}
                  >
                    <ProblemDescription
                      problem={completeProblem}
                      difficulty={config.difficulty}
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-3xl xl:max-w-4xl">
                    <StreamWindow
                      content={streamContent}
                      isStreaming={isStreaming}
                    />
                  </div>
                )}
              </div>

              {/* Right: editor + test cases — grows from 0 and slides up */}
              <div className="sandbox-right-panel h-full">
                {completeProblem && (
                  <ProblemWorkspace
                    problem={completeProblem}
                    language={config.language}
                    code={code}
                    onCodeChange={setCode}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat bar — fades out during transition */}
        {(showChatBar || showExitingChatBar) && (
          <div
            className={`flex-shrink-0 pb-8 xl:pb-10 pt-2 ${
              showExitingChatBar ? "sandbox-chatbar-exit" : ""
            }`}
          >
            <ChatBar onSubmit={handleSubmit} disabled={isStreaming} />
          </div>
        )}
      </div>
    </div>
  );
}
