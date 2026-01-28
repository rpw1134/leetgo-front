import { Link } from "react-router-dom";
import { EmailIcon } from "../SVGs/EmailIcon";

interface EmailVerificationSentProps {
  email: string;
}

export const EmailVerificationSent = ({ email }: EmailVerificationSentProps) => {
  return (
    <div className="text-center animate-fade-in">
      {/* Email Icon */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 blur-xl bg-leetgo-bright/10 rounded-full scale-125" />
          <EmailIcon className="w-32 h-32 md:w-40 md:h-40 relative z-10 email-icon-enter" />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-3 mb-6">
        <h2 className="font-eb-garamond text-2xl md:text-3xl text-white font-medium">
          Check your inbox
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-leetgo-bright to-transparent mx-auto" />
      </div>

      {/* Message */}
      <div className="space-y-4 mb-8">
        <p className="font-raleway text-white/70 text-sm md:text-base max-w-sm mx-auto">
          We've sent a verification link to
        </p>
        <p className="font-raleway text-leetgo-bright font-medium text-base md:text-lg break-all px-4">
          {email}
        </p>
        <p className="font-raleway text-white/50 text-sm max-w-xs mx-auto">
          Click the link in your email to verify your account and start practicing.
        </p>
      </div>

      {/* Tips section */}
      <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10">
        <p className="font-raleway text-white/40 text-xs mb-2">
          Didn't receive the email?
        </p>
        <ul className="font-raleway text-white/60 text-xs space-y-1">
          <li>Check your spam or junk folder</li>
          <li>Make sure you entered the correct email</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <Link
          to="/login"
          className="inline-block font-raleway text-leetgo-bright hover:text-white transition-colors text-sm"
        >
          Return to login
        </Link>
      </div>
    </div>
  );
};
