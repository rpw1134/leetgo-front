import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ConfigPanel } from "../../components/sandbox/ConfigPanel";
import { ChatBar } from "../../components/sandbox/ChatBar";
import { DEFAULT_SANDBOX_CONFIG } from "../../types/sandbox";
import type { SandboxConfig } from "../../types/sandbox";

/**
 * Sandbox page — clean, inset config surface + chat bar.
 * No decorative text. The controls are the experience.
 */
export default function Sandbox() {
  const [config, setConfig] = useState<SandboxConfig>(DEFAULT_SANDBOX_CONFIG);

  const handleConfigChange = useCallback(
    (updates: Partial<SandboxConfig>) => {
      setConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (message: string) => {
      console.log("Submit:", { message, config });
    },
    [config],
  );

  return (
    <div className="min-h-screen w-full bg-slate-950 overflow-hidden">
      <div className="fixed inset-0 sandbox-bg" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 sm:px-8 xl:px-12 py-5 xl:py-6">
          <Link to="/" className="group flex items-center gap-0.5 opacity-40 hover:opacity-70 transition-opacity">
            <span className="font-eb-garamond text-lg xl:text-xl text-white">&lt;</span>
            <span className="font-eb-garamond text-lg xl:text-xl text-white/50">/</span>
            <span className="font-eb-garamond text-lg xl:text-xl text-white">&gt;</span>
          </Link>

          <Link
            to="/profile"
            className="text-xs xl:text-sm font-raleway text-slate-600 hover:text-slate-400 transition-colors tracking-wide"
          >
            Profile
          </Link>
        </header>

        {/* Config panel — centered, this IS the page */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 xl:px-8 pb-4">
          <div className="w-full max-w-xl xl:max-w-2xl">
            <ConfigPanel config={config} onConfigChange={handleConfigChange} />
          </div>
        </div>

        {/* Chat bar */}
        <div className="sticky bottom-0 pb-8 xl:pb-10 pt-2">
          <ChatBar onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
