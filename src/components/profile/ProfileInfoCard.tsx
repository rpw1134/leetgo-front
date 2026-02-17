import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import type { User } from "../../types/user";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileTierBadge } from "./ProfileTierBadge";
import { uploadProfilePicture, updateUsername } from "../../utils/api/users";
import { LoadingSpinner } from "../SVGs/LoadingSpinner";

interface ProfileInfoCardProps {
  user: User;
  onUserUpdate: (updates: Partial<User>) => void;
}

type SuccessMessage = {
  type: "username" | "avatar";
  message: string;
} | null;

const profileCardStyle = {
  background: "linear-gradient(165deg, rgba(26, 31, 42, 0.85) 0%, rgba(18, 22, 29, 0.95) 100%)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
};

const dividerStyle = {
  background: "linear-gradient(90deg, transparent, rgba(90, 101, 120, 0.3) 20%, rgba(0, 235, 23, 0.15) 50%, rgba(90, 101, 120, 0.3) 80%, transparent)",
};

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  user,
  onUserUpdate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user.username || "");
  const [successMessage, setSuccessMessage] = useState<SuccessMessage>(null);

  // Image preview state
  const [pendingImage, setPendingImage] = useState<{
    file: File;
    previewUrl: string;
  } | null>(null);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (pendingImage?.previewUrl) {
        URL.revokeObjectURL(pendingImage.previewUrl);
      }
    };
  }, [pendingImage]);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      if (!user.email) throw new Error("No email found");
      return uploadProfilePicture(user.email, file);
    },
    onSuccess: (newUrl) => {
      onUserUpdate({ pfpUrl: newUrl });
      setPendingImage(null);
      setSuccessMessage({ type: "avatar", message: "Profile picture updated!" });
    },
  });

  const usernameMutation = useMutation({
    mutationFn: (newUsername: string) => {
      if (!user.email) throw new Error("No email found");
      return updateUsername(user.email, newUsername);
    },
    onSuccess: () => {
      onUserUpdate({ username: usernameInput });
      setIsEditingUsername(false);
      setSuccessMessage({ type: "username", message: "Username updated!" });
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
        alert("Please select a PNG or JPG image");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setPendingImage({ file, previewUrl });
    }
    e.target.value = "";
  };

  const handleConfirmUpload = () => {
    if (pendingImage) {
      uploadMutation.mutate(pendingImage.file);
    }
  };

  const handleCancelUpload = () => {
    if (pendingImage?.previewUrl) {
      URL.revokeObjectURL(pendingImage.previewUrl);
    }
    setPendingImage(null);
  };

  const handleStartEditUsername = () => {
    setUsernameInput(user.username || "");
    setIsEditingUsername(true);
  };

  const handleSaveUsername = () => {
    const trimmed = usernameInput.trim();
    if (trimmed && trimmed !== user.username) {
      usernameMutation.mutate(trimmed);
    } else {
      setIsEditingUsername(false);
    }
  };

  const handleCancelUsername = () => {
    setIsEditingUsername(false);
    setUsernameInput(user.username || "");
  };

  const handleUsernameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveUsername();
    } else if (e.key === "Escape") {
      handleCancelUsername();
    }
  };

  return (
    <div
      className="relative rounded-2xl p-10 border border-slate-500/15 backdrop-blur-[16px] overflow-hidden"
      style={profileCardStyle}
    >
      {/* Decorative corner accents */}
      <div
        className="absolute top-0 left-0 w-[60px] h-[60px] pointer-events-none rounded-tl-2xl border-t border-l border-leetgo-bright/20"
      />
      <div
        className="absolute bottom-0 right-0 w-[60px] h-[60px] pointer-events-none rounded-br-2xl border-b border-r border-leetgo-bright/20"
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Success message toast */}
      {successMessage && (
        <div className="profile-success-toast">
          <CheckIcon />
          <span>{successMessage.message}</span>
        </div>
      )}

      {/* Header section with avatar */}
      <div className="flex flex-col items-center mb-8">
        {/* Avatar with edit overlay */}
        <div className="relative">
          <ProfileAvatar
            imageUrl={pendingImage?.previewUrl || user.pfpUrl}
            username={user.username}
            email={user.email}
            size="lg"
          />

          {/* Show different overlay based on state */}
          {!pendingImage && !uploadMutation.isPending && (
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-1.5 right-1.5 flex items-center justify-center w-[26px] h-[26px] p-0 rounded-md cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] text-white/70 border border-slate-500/50 hover:text-leetgo-bright hover:border-leetgo-bright/50 hover:scale-105"
              style={{
                background: "rgba(18, 22, 29, 0.95)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
              aria-label="Change profile picture"
            >
              <PencilIconSmall />
            </button>
          )}

          {uploadMutation.isPending && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70">
              <LoadingSpinner className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Image upload confirmation */}
        {pendingImage && !uploadMutation.isPending && (
          <div className="mt-3 text-center">
            <p className="font-raleway text-xs text-slate-500 mb-2">
              Use this photo?
            </p>
            <div className="flex justify-center gap-1.5">
              <ActionButton variant="confirm" onClick={handleConfirmUpload} aria-label="Confirm upload">
                <CheckIconSmall />
              </ActionButton>
              <ActionButton variant="cancel" onClick={handleCancelUpload} aria-label="Cancel upload">
                <CloseIconSmall />
              </ActionButton>
            </div>
          </div>
        )}

        {/* Username/Email and tier */}
        <div className="mt-6 text-center w-full">
          {isEditingUsername ? (
            <div className="flex items-center justify-center gap-1">
              <span className="font-raleway text-2xl font-semibold text-white/50">@</span>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyDown={handleUsernameKeyDown}
                className="font-raleway text-2xl font-semibold text-white/95 bg-transparent border-none border-b border-b-slate-500/40 outline-none px-1 pb-0.5 w-[140px] transition-[border-color] duration-200 focus:border-b-leetgo-bright/60 disabled:opacity-60 placeholder:text-slate-500/50 placeholder:italic placeholder:font-normal"
                autoFocus
                placeholder="username"
                disabled={usernameMutation.isPending}
              />
              {usernameMutation.isPending ? (
                <LoadingSpinner className="w-4 h-4 text-slate-400 ml-1" />
              ) : (
                <div className="flex items-center gap-1 ml-1.5">
                  <ActionButton variant="confirm" onClick={handleSaveUsername} disabled={!usernameInput.trim()} aria-label="Save username">
                    <CheckIconSmall />
                  </ActionButton>
                  <ActionButton variant="cancel" onClick={handleCancelUsername} aria-label="Cancel">
                    <CloseIconSmall />
                  </ActionButton>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="font-raleway text-2xl font-semibold text-white/95 tracking-tight">
                {user.username ? `@${user.username}` : user.email}
              </h2>
              <PencilButton onClick={handleStartEditUsername} aria-label="Edit username" />
            </div>
          )}
          <div className="mt-3">
            <ProfileTierBadge tier={user.paidTier} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={dividerStyle} />

      {/* Info rows */}
      <div className="space-y-4 mt-6">
        <ProfileInfoRow
          icon={<EmailIcon />}
          label="Email"
          value={user.email}
          placeholder="No email connected"
        />

        <ProfileInfoRow
          icon={<UserIcon />}
          label="Username"
          value={user.username}
          placeholder="Not set"
          onEdit={handleStartEditUsername}
        />

        <ProfileInfoRow
          icon={<AuthIcon provider={user.oauthStatus} />}
          label="Account Type"
          value={formatAuthType(user.oauthStatus)}
          placeholder="Standard"
        />
      </div>

      {/* Error messages */}
      {(uploadMutation.isError || usernameMutation.isError) && (
        <div className="flex items-start gap-2 mt-4 py-3 px-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-raleway text-[0.85rem]">
          <ErrorIcon />
          <p>
            {uploadMutation.error?.message ||
              usernameMutation.error?.message ||
              "An error occurred. Please try again."}
          </p>
        </div>
      )}
    </div>
  );
};

// --- Reusable small components ---

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "confirm" | "cancel";
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ variant, children, ...props }) => {
  const isConfirm = variant === "confirm";
  return (
    <button
      type="button"
      className={`flex items-center justify-center w-5 h-5 p-0 rounded-[5px] cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] border border-slate-500/40 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none ${
        isConfirm
          ? "text-leetgo-bright hover:bg-leetgo-bright/20 hover:border-leetgo-bright/50 hover:scale-[1.08]"
          : "text-red-400/90 hover:bg-red-400/15 hover:border-red-400/40 hover:scale-[1.08]"
      }`}
      style={{
        background: "rgba(18, 22, 29, 0.9)",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

interface PencilButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PencilButton: React.FC<PencilButtonProps> = (props) => (
  <button
    type="button"
    className="flex items-center justify-center w-5 h-5 p-0 rounded-[5px] cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] text-white/50 border border-slate-500/35 hover:bg-leetgo-bright/15 hover:border-leetgo-bright/40 hover:text-leetgo-bright hover:scale-[1.08]"
    style={{
      background: "rgba(18, 22, 29, 0.8)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
    }}
    {...props}
  >
    <PencilIcon />
  </button>
);

// --- ProfileInfoRow ---

interface ProfileInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  placeholder: string;
  onEdit?: () => void;
}

const ProfileInfoRow: React.FC<ProfileInfoRowProps> = ({
  icon,
  label,
  value,
  placeholder,
  onEdit,
}) => {
  return (
    <div className="flex items-start gap-4 py-3 px-4 rounded-[10px] border border-slate-500/10 bg-slate-700/30 transition-all duration-[250ms] hover:bg-slate-700/50 hover:border-slate-500/20">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 mt-0.5 text-slate-500/80" style={{ background: "rgba(18, 22, 29, 0.6)" }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-raleway text-xs uppercase tracking-widest text-slate-500 mb-1">
          {label}
        </p>
        <p
          className={`font-raleway text-sm truncate ${
            value ? "text-white/85" : "text-slate-600 italic"
          }`}
        >
          {value || placeholder}
        </p>
      </div>
      {onEdit && <PencilButton onClick={onEdit} aria-label={`Edit ${label}`} />}
    </div>
  );
};

// Icons

const PencilIconSmall = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const CheckIconSmall = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIconSmall = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-px">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

interface AuthIconProps {
  provider: "standard" | "google" | "github" | undefined;
}

const AuthIcon: React.FC<AuthIconProps> = ({ provider }) => {
  if (provider === "google") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    );
  }

  if (provider === "github") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};

function formatAuthType(
  status: "standard" | "google" | "github" | undefined
): string {
  switch (status) {
    case "google":
      return "Google";
    case "github":
      return "GitHub";
    case "standard":
    default:
      return "Email & Password";
  }
}
