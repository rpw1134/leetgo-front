import { type PaidTier, PAID_TIER_MAP } from "../../types/user";

interface ProfileTierBadgeProps {
  tier: PaidTier;
}

interface BadgeStyles {
  className: string;
  style?: React.CSSProperties;
}

export const ProfileTierBadge: React.FC<ProfileTierBadgeProps> = ({ tier }) => {
  const tierInfo = PAID_TIER_MAP[tier];

  const getBadgeStyles = (): BadgeStyles => {
    switch (tier) {
      case 0:
        return {
          className: "bg-slate-500/20 border border-slate-500/30 text-slate-500/90",
        };
      case 1:
        return {
          className: "border border-blue-500/30 text-blue-400",
          style: {
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)",
          },
        };
      case 2:
        return {
          className: "border border-amber-400/40 text-amber-400",
          style: {
            background:
              "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)",
            boxShadow:
              "0 0 20px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          },
        };
      default:
        return {
          className: "bg-slate-500/20 border border-slate-500/30 text-slate-500/90",
        };
    }
  };

  const badgeStyles = getBadgeStyles();

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-raleway text-xs font-semibold tracking-wider uppercase ${badgeStyles.className}`}
      style={badgeStyles.style}
    >
      {tier === 2 && (
        <span className="flex items-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </span>
      )}
      {tier === 1 && (
        <span className="flex items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </span>
      )}
      <span>{tierInfo.label}</span>
    </div>
  );
};
