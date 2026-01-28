import { useState } from "react";
import { SignupHeader } from "../../components/signup/SignupHeader";
import { SignupForm } from "../../components/signup/SignupForm";
import { EmailVerificationSent } from "../../components/signup/EmailVerificationSent";
import { BinaryTreeSVG } from "../../components/SVGs/BinaryTreeSVG";
import { GraphSVG } from "../../components/SVGs/GraphSVG";
import { LinkedListSVG } from "../../components/SVGs/LinkedListSVG";
import { GridOverlay } from "../../components/reusable/backgrounds/GridOverlay";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../utils/api/users";

interface SignupState {
  email: string;
  isVerificationSent: boolean;
  serverError: string | null;
}

export const Signup: React.FC = () => {
  const [state, setState] = useState<SignupState>({
    email: "",
    isVerificationSent: false,
    serverError: null,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
  });

  const handleSignup = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, serverError: null }));

    try {
      await mutateAsync({ email, password });
      setState({
        email,
        isVerificationSent: true,
        serverError: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        serverError:
          error instanceof Error ? error.message : "Failed to create account",
      }));
    }
  };

  return (
    <div className="min-h-screen w-full bg-leetgo-darkest overflow-hidden grain-overlay">
      {/* Background gradient */}
      <div className="fixed inset-0 signup-bg-gradient" />

      {/* Decorative data structures - asymmetrical layout, hidden on mobile */}
      <div className="fixed inset-0 pointer-events-none hidden lg:block">
        {/* Top-left: Graph */}
        <div className="absolute -left-8 top-16 opacity-15">
          <GraphSVG className="w-96 h-auto graph-float" />
        </div>

        {/* Right side: Binary tree - larger to balance the graph */}
        <div className="absolute -right-12 top-1/4 opacity-20">
          <BinaryTreeSVG className="w-110 h-auto tree-float" />
        </div>

        {/* Bottom-left: Linked list - horizontal, subtle */}
        <div className="absolute left-12 bottom-28 opacity-15 -rotate-6">
          <LinkedListSVG className="w-96 h-auto list-float" />
        </div>
      </div>

      <GridOverlay size={80} opacity={0.015} fixed />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          {/* Glass card container */}
          <div className="signup-card p-8 md:p-10 rounded-2xl">
            {state.isVerificationSent ? (
              <EmailVerificationSent email={state.email} />
            ) : (
              <>
                <SignupHeader />
                <SignupForm
                  onSubmit={handleSignup}
                  isLoading={isPending}
                  serverError={state.serverError}
                />
              </>
            )}
          </div>

          {/* Footer link - only show during signup */}
          {!state.isVerificationSent && (
            <p className="mt-8 text-center text-white/30 text-xs font-raleway">
              By signing up, you agree to our{" "}
              <a
                href="/terms"
                className="text-leetgo-bright/60 hover:text-leetgo-bright transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-leetgo-bright/60 hover:text-leetgo-bright transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-24 h-24 md:w-32 md:h-32 border-l-2 border-t-2 border-leetgo-bright/10 m-4 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 border-r-2 border-b-2 border-leetgo-bright/10 m-4 pointer-events-none" />
    </div>
  );
};
