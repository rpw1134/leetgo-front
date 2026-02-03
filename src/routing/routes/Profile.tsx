import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { ProfileInfoCard } from "../../components/profile/ProfileInfoCard";
import { GridOverlay } from "../../components/reusable/backgrounds/GridOverlay";
import { LoadingSpinner } from "../../components/SVGs/LoadingSpinner";
import useUserContext from "../../customHooks/useUserContext";
import { fetchCurrentUser } from "../../utils/api/users";
import type { User } from "../../types/user";

export const Profile: React.FC = () => {
  const { user, setUser } = useUserContext();

  const handleUserUpdate = useCallback(
    (updates: Partial<User>) => {
      if (user) {
        setUser({ ...user, ...updates });
      }
    },
    [user, setUser]
  );

  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 2 * 60 * 1000,
    enabled: !user,
  });

  useEffect(() => {
    if (fetchedUser && !user) {
      setUser(fetchedUser);
    }
  }, [fetchedUser, user, setUser]);

  // Show loading state while fetching
  if (isLoading && !user) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <LoadingSpinner className="w-10 h-10 text-leetgo-bright" />
          <p className="font-raleway text-sm text-slate-500 mt-4">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if fetch failed (unauthorized)
  if (error && !user) {
    return <Navigate to="/login" replace />;
  }

  // Use context user or fetched user
  const displayUser = user || fetchedUser;

  if (!displayUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 profile-bg" />

      {/* Subtle grid overlay */}
      <GridOverlay size={60} opacity={0.015} fixed />

      {/* Top accent line */}
      <div className="fixed top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-leetgo-bright/20 to-transparent z-20" />

      {/* Navigation header */}
      <header className="relative z-10 w-full px-6 py-4">
        <nav className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-1">
            <span className="font-eb-garamond text-2xl font-light text-leetgo-bright group-hover:text-white transition-colors">
              &lt;
            </span>
            <span className="font-eb-garamond text-2xl font-light text-white/80">
              /
            </span>
            <span className="font-eb-garamond text-2xl font-light text-leetgo-bright group-hover:text-white transition-colors">
              &gt;
            </span>
          </Link>

          <Link
            to="/sandbox"
            className="font-raleway text-sm text-slate-400 hover:text-white transition-colors"
          >
            Back to Practice
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-8 pb-16">
        <div className="w-full max-w-md">
          {/* Page title */}
          <div className="text-center mb-10">
            <h1 className="font-raleway text-3xl font-light text-white/90 tracking-tight mb-2">
              Your Profile
            </h1>
            <p className="font-raleway text-sm text-slate-500">
              Manage your account settings
            </p>
          </div>

          <ProfileInfoCard user={displayUser} onUserUpdate={handleUserUpdate} />
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950/80 to-transparent pointer-events-none" />
    </div>
  );
};
