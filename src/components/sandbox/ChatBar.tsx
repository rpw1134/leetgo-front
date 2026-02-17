import { useState, useRef, useCallback } from "react";
import { SendIcon } from "../SVGs/SendIcon";

interface ChatBarProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

/**
 * Chat input bar with animated glowing green border.
 * Idle: a faint green pulse traces the border.
 * Focused: the border glows steadily (still faint/subtle).
 */
export const ChatBar = ({ onSubmit, disabled = false }: ChatBarProps) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /** Auto-resize textarea to content, capped at ~5 lines */
  const handleInput = useCallback((value: string) => {
    setMessage(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, []);

  /** Submit on enter (without shift) */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;

    onSubmit(trimmed);
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const hasContent = message.trim().length > 0 && !disabled;

  return (
    <div className="w-full max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-0">
      {/* Outer glow wrapper — handles the animated border */}
      <div
        className={`
          sandbox-chat-glow relative rounded-2xl p-px
          ${isFocused ? "sandbox-chat-glow--focused" : ""}
        `}
      >
        {/* Inner container */}
        <div className="sandbox-chat-inner relative flex items-center gap-2 rounded-2xl px-4 py-3 xl:px-5 xl:py-4">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder={disabled ? "Generating problem..." : "Describe the kind of problem you want to practice..."}
            rows={1}
            className="
              flex-1 bg-transparent resize-none outline-none
              text-sm sm:text-base xl:text-lg text-white/90 placeholder-slate-600
              font-raleway leading-relaxed
              scrollbar-thin scrollbar-thumb-slate-700
            "
            style={{ maxHeight: "140px" }}
          />

          {/* Send button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasContent}
            className={`
              flex items-center justify-center w-8 h-8 xl:w-10 xl:h-10 rounded-full
              transition-all duration-200 flex-shrink-0
              ${
                hasContent
                  ? "bg-leetgo-primary text-slate-950 hover:bg-leetgo-bright cursor-pointer shadow-[0_0_12px_rgba(0,235,23,0.25)]"
                  : "bg-slate-800 text-slate-600 cursor-not-allowed"
              }
            `}
          >
            <SendIcon size={16} />
          </button>
        </div>
      </div>

      {/* Hint text */}
      <p className="text-center text-slate-600 text-xs xl:text-sm font-raleway mt-2.5 tracking-wide">
        Press <span className="text-slate-500">Enter</span> to send, <span className="text-slate-500">Shift + Enter</span> for new line
      </p>
    </div>
  );
};
