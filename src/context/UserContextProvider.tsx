import { userContext } from "./userContext";

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <userContext.Provider
      value={{
        email: null,
        username: null,
        pfpUrl: null,
        paidTier: "free",
      }}
    >
      {children}
    </userContext.Provider>
  );
}
