import { type PaidTier, PAID_TIER_MAP } from "../../types/user";

interface ProfileTierBadgeProps {
  tier: PaidTier;
}

export const ProfileTierBadge: React.FC<ProfileTierBadgeProps> = ({ tier }) => {
  const tierInfo = PAID_TIER_MAP[tier];

  const getBadgeStyles = () => {
    switch (tier) {
      case 0:
        return "tier-badge-free";
      case 1:
        return "tier-badge-pro";
      case 2:
        return "tier-badge-premium";
      default:
        return "tier-badge-free";
    }
  };

  return (
    <div className={`tier-badge ${getBadgeStyles()}`}>
      {tier === 2 && (
        <span className="tier-badge-icon">
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
        <span className="tier-badge-icon">
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
      <span className="tier-badge-label">{tierInfo.label}</span>
    </div>
  );
};
