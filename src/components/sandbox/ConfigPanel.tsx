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

const DIFFICULTY_VARIANT: Record<Difficulty, "easy" | "medium" | "hard"> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

const insetPanelStyle = {
  background: "rgba(8, 10, 14, 0.7)",
  border: "1px solid rgba(90, 101, 120, 0.07)",
  boxShadow:
    "inset 0 2px 6px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.02)",
};

const dividerStyle = {
  background:
    "linear-gradient(90deg, transparent, rgba(90, 101, 120, 0.1) 30%, rgba(90, 101, 120, 0.1) 70%, transparent)",
};

export const ConfigPanel = ({ config, onConfigChange }: ConfigPanelProps) => {
  return (
    <div
      className="rounded-xl px-5 py-5 sm:px-7 sm:py-6 xl:px-9 xl:py-8"
      style={insetPanelStyle}
    >
      <div className="flex flex-col gap-5 xl:gap-6">
        <ConfigOption<AIModel>
          label="Model"
          icon={<BrainIcon size={15} className="xl:w-[18px] xl:h-[18px]" />}
          options={MODEL_LABELS}
          selected={config.model}
          onSelect={(model) => onConfigChange({ model })}
        />

        <div className="h-px" style={dividerStyle} />

        <ConfigOption<ProgrammingLanguage>
          label="Language"
          icon={<CodeIcon size={15} className="xl:w-[18px] xl:h-[18px]" />}
          options={LANGUAGE_LABELS}
          selected={config.language}
          onSelect={(language) => onConfigChange({ language })}
        />

        <div className="h-px" style={dividerStyle} />

        <ConfigOption<Difficulty>
          label="Difficulty"
          icon={<GaugeIcon size={15} className="xl:w-[18px] xl:h-[18px]" />}
          options={DIFFICULTY_LABELS}
          selected={config.difficulty}
          onSelect={(difficulty) => onConfigChange({ difficulty })}
          variant={DIFFICULTY_VARIANT[config.difficulty]}
        />

        <div className="h-px" style={dividerStyle} />

        <ConfigOption<ProblemType>
          label="Problem Type"
          icon={<CategoryIcon size={15} className="xl:w-[18px] xl:h-[18px]" />}
          options={PROBLEM_TYPE_LABELS}
          selected={config.problemType}
          onSelect={(problemType) => onConfigChange({ problemType })}
        />
      </div>
    </div>
  );
};
