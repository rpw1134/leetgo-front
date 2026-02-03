import { useRef, useState } from "react";
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

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  user,
  onUserUpdate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user.username || "");

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      if (!user.email) throw new Error("No email found");
      return uploadProfilePicture(user.email, file);
    },
    onSuccess: (newUrl) => {
      onUserUpdate({ pfpUrl: newUrl });
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
      uploadMutation.mutate(file);
    }
    e.target.value = "";
  };

  const handleUsernameSubmit = () => {
    if (usernameInput.trim() && usernameInput !== user.username) {
      usernameMutation.mutate(usernameInput.trim());
    } else {
      setIsEditingUsername(false);
      setUsernameInput(user.username || "");
    }
  };

  const handleUsernameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUsernameSubmit();
    } else if (e.key === "Escape") {
      setIsEditingUsername(false);
      setUsernameInput(user.username || "");
    }
  };

  return (
    <div className="profile-card">
      {/* Decorative corner accents */}
      <div className="profile-card-corner profile-card-corner-tl" />
      <div className="profile-card-corner profile-card-corner-br" />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header section with avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <ProfileAvatar
            imageUrl={user.pfpUrl}
            username={user.username}
            email={user.email}
            size="lg"
          />
          {/* Avatar upload overlay */}
          <button
            onClick={handleAvatarClick}
            disabled={uploadMutation.isPending}
            className="profile-avatar-overlay"
            aria-label="Upload profile picture"
          >
            {uploadMutation.isPending ? (
              <LoadingSpinner className="w-6 h-6 text-white" />
            ) : (
              <CameraIcon />
            )}
          </button>
        </div>

        {/* Username/Email and tier */}
        <div className="mt-6 text-center">
          {isEditingUsername ? (
            <div className="flex items-center gap-2">
              <span className="font-raleway text-2xl font-semibold text-white/60">
                @
              </span>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onBlur={handleUsernameSubmit}
                onKeyDown={handleUsernameKeyDown}
                className="profile-username-input"
                autoFocus
                placeholder="username"
              />
              {usernameMutation.isPending && (
                <LoadingSpinner className="w-5 h-5 text-leetgo-bright" />
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsEditingUsername(true)}
              className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <h2 className="font-raleway text-2xl font-semibold text-white/95 tracking-tight">
                {user.username ? `@${user.username}` : user.email}
              </h2>
              <EditIcon className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
          <div className="mt-3">
            <ProfileTierBadge tier={user.paidTier} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="profile-divider" />

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
          onEdit={() => setIsEditingUsername(true)}
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
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="font-raleway text-sm text-red-400">
            {uploadMutation.error?.message ||
              usernameMutation.error?.message ||
              "An error occurred"}
          </p>
        </div>
      )}
    </div>
  );
};

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
    <div className="profile-info-row group">
      <div className="profile-info-icon">{icon}</div>
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
      {onEdit && (
        <button
          onClick={onEdit}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-700/50 rounded"
          aria-label={`Edit ${label}`}
        >
          <EditIcon className="w-4 h-4 text-slate-400" />
        </button>
      )}
    </div>
  );
};

const CameraIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const EditIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
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
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
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

  // Standard/email auth
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
