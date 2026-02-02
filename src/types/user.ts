type PaidTier = 0 | 1 | 2;

type PaidTierInfo = {
  name: string;
  label: string;
  color: string;
};

const PAID_TIER_MAP: Record<PaidTier, PaidTierInfo> = {
  0: { name: "free", label: "Free", color: "slate" },
  1: { name: "pro", label: "Pro", color: "blue" },
  2: { name: "premium", label: "Premium", color: "gold" },
};

type User = {
  id?: number;
  email: string | null;
  username: string | null;
  pfpUrl: string | null;
  paidTier: PaidTier;
  oauthStatus?: "standard" | "google" | "github";
};

type UserApiResponse = {
  id: number;
  email: string | null;
  username: string | null;
  profile_picture_url: string | null;
  oauth_status: "standard" | "google" | "github";
  paid_tier: PaidTier;
};

function mapApiResponseToUser(response: UserApiResponse): User {
  return {
    id: response.id,
    email: response.email,
    username: response.username,
    pfpUrl: response.profile_picture_url,
    paidTier: response.paid_tier,
    oauthStatus: response.oauth_status,
  };
}

export {
  type User,
  type PaidTier,
  type PaidTierInfo,
  type UserApiResponse,
  PAID_TIER_MAP,
  mapApiResponseToUser,
};
