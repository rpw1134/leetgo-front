import { useState } from "react";

interface WaitlistFormProps {
  onSubmit: (email: string) => void;
}

export const WaitlistForm = ({ onSubmit }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    onSubmit(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!isValid) {
      setIsValid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Enter your email address"
          className={`
            w-full px-6 py-4
            bg-[var(--color-leetgo-darkest)]/50
            border-2 rounded-xl
            text-white font-raleway text-lg
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[var(--color-leetgo-bright)]
            transition-all duration-300
            backdrop-blur-sm
            ${
              isValid
                ? "border-[var(--color-leetgo-forest)]/50 hover:border-[var(--color-leetgo-primary)]"
                : "border-red-500 shake-animation"
            }
          `}
          required
        />
        {!isValid && (
          <p className="text-red-400 text-sm font-raleway ml-2">
            Please enter a valid email address
          </p>
        )}
      </div>

      <button
        type="submit"
        className="splash-btn-primary w-full py-4 text-lg font-semibold"
      >
        Join the Wait List
      </button>
    </form>
  );
};
