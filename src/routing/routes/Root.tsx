import { Outlet } from "react-router-dom";

export const Root: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  );
};
