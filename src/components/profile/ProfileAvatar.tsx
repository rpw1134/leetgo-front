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
    <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
      <div
        className="absolute inset-[-3px] rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 235, 23, 0.3) 0%, rgba(32, 192, 48, 0.1) 50%, rgba(0, 235, 23, 0.2) 100%)",
        }}
      />
      <div
        className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-500/20"
        style={{ background: "linear-gradient(145deg, #1a1f2a 0%, #12161d 100%)" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${username || "User"}'s avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white/60"
            style={{
              background: "linear-gradient(145deg, #252c3a 0%, #1a1f2a 100%)",
            }}
          >
            <span className="font-raleway font-semibold tracking-wide">
              {getInitials()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
