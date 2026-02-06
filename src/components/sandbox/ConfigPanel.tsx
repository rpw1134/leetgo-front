import { ConfigOption } from "./ConfigOption";
import { BrainIcon } from "../SVGs/BrainIcon";
import { CodeIcon } from "../SVGs/CodeIcon";
import { GaugeIcon } from "../SVGs/GaugeIcon";
import { CategoryIcon } from "../SVGs/CategoryIcon";
import {
  MODEL_LABELS,
  LANGUAGE_LABELS,
  DIFFICULTY_LABELS,
  PROBLEM_TYPE_LABELS,
} from "../../types/sandbox";
import type {
  SandboxConfig,
  AIModel,
  ProgrammingLanguage,
  Difficulty,
  ProblemType,
} from "../../types/sandbox";

interface ConfigPanelProps {
  config: SandboxConfig;
  onConfigChange: (updates: Partial<SandboxConfig>) => void;
}

/** Difficulty -> variant mapping for colored pills */
const DIFFICULTY_VARIANT: Record<Difficulty, "easy" | "medium" | "hard"> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

/**
 * Configuration panel displayed above the chat bar.
 * Lets users select AI model, language, difficulty, and problem type
 * before submitting a prompt.
 */
export const ConfigPanel = ({ config, onConfigChange }: ConfigPanelProps) => {
  return (
    <div className="sandbox-config-panel rounded-xl p-4 sm:p-5 animate-fade-in">
      {/* Panel header */}
      <p className="text-slate-400 text-sm font-raleway font-medium mb-4 tracking-wide">
        Configure your problem
      </p>

      {/* Options grid — 2x2 on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <ConfigOption<AIModel>
          label="Model"
          icon={<BrainIcon size={13} />}
          options={MODEL_LABELS}
          selected={config.model}
          onSelect={(model) => onConfigChange({ model })}
        />

        <ConfigOption<ProgrammingLanguage>
          label="Language"
          icon={<CodeIcon size={13} />}
          options={LANGUAGE_LABELS}
          selected={config.language}
          onSelect={(language) => onConfigChange({ language })}
        />

        <ConfigOption<Difficulty>
          label="Difficulty"
          icon={<GaugeIcon size={13} />}
          options={DIFFICULTY_LABELS}
          selected={config.difficulty}
          onSelect={(difficulty) => onConfigChange({ difficulty })}
          variant={DIFFICULTY_VARIANT[config.difficulty]}
        />

        <ConfigOption<ProblemType>
          label="Problem Type"
          icon={<CategoryIcon size={13} />}
          options={PROBLEM_TYPE_LABELS}
          selected={config.problemType}
          onSelect={(problemType) => onConfigChange({ problemType })}
        />
      </div>
    </div>
  );
};
