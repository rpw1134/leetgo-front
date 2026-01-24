interface ProblemCardProps {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  className?: string;
  isNew?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  difficulty,
  tags,
  className = "",
  isNew = false,
}) => {
  const difficultyClass = {
    easy: "difficulty-easy",
    medium: "difficulty-medium",
    hard: "difficulty-hard",
  }[difficulty];

  return (
    <div
      className={`problem-card problem-card-shimmer rounded-xl p-5 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`${difficultyClass} text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide`}
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
