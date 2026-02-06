import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { GridOverlay } from "../../components/reusable/backgrounds/GridOverlay";
import { ConfigPanel } from "../../components/sandbox/ConfigPanel";
import { ChatBar } from "../../components/sandbox/ChatBar";
import { DEFAULT_SANDBOX_CONFIG } from "../../types/sandbox";
import type { SandboxConfig } from "../../types/sandbox";

/**
 * Sandbox page — ChatGPT-style layout.
 * Users configure problem parameters, then submit a prompt via the chat bar
 * to generate a practice problem.
 */
export default function Sandbox() {
  const [config, setConfig] = useState<SandboxConfig>(DEFAULT_SANDBOX_CONFIG);

  /** Merge partial config updates into state */
  const handleConfigChange = useCallback(
    (updates: Partial<SandboxConfig>) => {
      setConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  /** Handle chat submission */
  const handleSubmit = useCallback(
    (message: string) => {
      // TODO: Send message + config to backend for problem generation
      console.log("Submit:", { message, config });
    },
    [config],
  );

  return (
    <div className="min-h-screen w-full bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 sandbox-bg" />

      {/* Subtle grid */}
      <GridOverlay size={60} opacity={0.008} fixed />

      {/* Top accent line */}
      <div className="fixed top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-leetgo-bright/15 to-transparent z-20" />

      {/* Main layout — full viewport, flex column */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-5 sm:px-8 py-4">
          <Link to="/" className="group flex items-center gap-1">
            <span className="font-eb-garamond text-xl font-light text-leetgo-bright group-hover:text-white transition-colors">
              &lt;
            </span>
            <span className="font-eb-garamond text-xl font-light text-white/70">
              /
            </span>
            <span className="font-eb-garamond text-xl font-light text-leetgo-bright group-hover:text-white transition-colors">
              &gt;
            </span>
          </Link>

          <Link
            to="/profile"
            className="text-xs font-raleway text-slate-500 hover:text-slate-300 transition-colors tracking-wide"
          >
            Profile
          </Link>
        </header>

        {/* Center content — grows to push chat bar down */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
          {/* Welcome message — shown when chat is empty */}
          <div className="mb-8 sm:mb-12 text-center animate-fade-in">
            <h1 className="sandbox-welcome-gradient font-raleway text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
              What do you want to practice?
            </h1>
            <p className="text-slate-500 font-raleway text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Configure your problem below, then describe what you're looking for.
            </p>
          </div>

          {/* Config panel */}
          <div className="w-full max-w-3xl mb-6">
            <ConfigPanel config={config} onConfigChange={handleConfigChange} />
          </div>
        </div>

        {/* Chat bar — pinned to bottom */}
        <div className="sticky bottom-0 pb-5 pt-2">
          <ChatBar onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
