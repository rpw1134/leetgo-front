type PaidTier = "free" | "pro" | "enterprise";

type User = {
  email: string | null;
  username: string | null;
  pfpUrl: string | null;
  paidTier: PaidTier;
};

export { type User, type PaidTier };
