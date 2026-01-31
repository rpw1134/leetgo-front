import { createContext } from "react";
import type { User } from "../types/user";

const userContext = createContext<User>({
  email: null,
  username: null,
  pfpUrl: null,
  paidTier: "free",
});

export { userContext };
