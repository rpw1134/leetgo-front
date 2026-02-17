interface ProblemCardProps {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  className?: string;
  isNew?: boolean;
}

const difficultyStyles = {
  easy: {
    style: { background: "linear-gradient(135deg, #20c030 0%, #00eb17 100%)" },
    className: "text-leetgo-darkest",
  },
  medium: {
    style: { background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" },
    className: "text-leetgo-darkest",
  },
  hard: {
    style: { background: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)" },
    className: "text-white",
  },
};

const problemCardStyle = {
  background: "linear-gradient(145deg, rgba(43, 65, 45, 0.7) 0%, rgba(10, 31, 12, 0.9) 100%)",
  border: "1px solid rgba(0, 235, 23, 0.15)",
  backdropFilter: "blur(10px)",
};

export const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  difficulty,
  tags,
  className = "",
  isNew = false,
}) => {
  const badge = difficultyStyles[difficulty];

  return (
    <div
      className={`problem-card-shimmer rounded-xl p-5 ${className}`}
      style={problemCardStyle}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`${badge.className} text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide`}
          style={badge.style}
        >
          {difficulty}
        </span>
        {isNew && (
          <span className="text-xs text-leetgo-bright font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-leetgo-bright animate-pulse" />
            Just generated
          </span>
        )}
      </div>

      <h4 className="font-eb-garamond text-lg text-white font-medium mb-3 leading-snug">
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
