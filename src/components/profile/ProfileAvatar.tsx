interface ProfileAvatarProps {
  imageUrl: string | null;
  username: string | null;
  email?: string | null;
  size?: "sm" | "md" | "lg";
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imageUrl,
  username,
  email,
  size = "lg",
}) => {
  const getInitials = () => {
    if (username) {
      return username.slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "?";
  };

  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-20 h-20 text-2xl",
    lg: "w-32 h-32 text-4xl",
  };

  return (
    <div className={`profile-avatar-wrapper ${sizeClasses[size]}`}>
      <div className="profile-avatar-ring" />
      <div className="profile-avatar-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${username || "User"}'s avatar`}
            className="profile-avatar-image"
          />
        ) : (
          <div className="profile-avatar-fallback">
            <span className="font-raleway font-semibold tracking-wide">
              {getInitials()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
