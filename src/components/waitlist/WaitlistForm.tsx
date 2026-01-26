import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addUserToWaitlist } from "../../utils/api/waitlist";
import { GlassInput } from "../reusable/inputs/GlassInput";
import { PrimaryButton } from "../reusable/buttons/PrimaryButton";
import { LoadingSpinner } from "../SVGs/LoadingSpinner";

interface WaitlistFormProps {
  onSubmit: (email: string) => void;
}

export const WaitlistForm = ({ onSubmit }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const { mutateAsync, isPending, isError, error, reset } = useMutation({
    mutationFn: addUserToWaitlist,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    try {
      await mutateAsync(email);
      setIsValid(true);
      onSubmit(email);
    } catch (err) {
      console.error("Failed to add user to waitlist:", err);
      // isError state will be handled in render
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!isValid) {
      setIsValid(true);
    }
    if (isError) {
      reset();
    }
  };

  if (isPending) {
    return (
      <div className="w-full max-w-md mx-auto py-12 flex flex-col items-center justify-center space-y-4 animate-fade-in">
        <LoadingSpinner className="w-10 h-10 text-leetgo-primary" />
        <p className="text-white font-raleway text-lg animate-pulse">
          Securing your spot...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-8">
      <div className="relative">
        <GlassInput
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Enter your email address"
          isValid={isValid && !isError}
          required
        />
        <div className="absolute top-full left-0 mt-2 w-full">
          {!isValid && (
            <p className="text-red-400 text-sm font-raleway ml-2 animate-shake">
              Please enter a valid email address
            </p>
          )}
          {isError && (
            <p className="text-red-400 text-sm font-raleway ml-2 animate-shake">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."}
            </p>
          )}
        </div>
      </div>

      <PrimaryButton type="submit">Join the Wait List</PrimaryButton>
    </form>
  );
};
