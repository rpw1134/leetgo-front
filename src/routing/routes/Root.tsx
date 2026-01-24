import { Outlet } from "react-router-dom";

export const Root: React.FC = () => {
  return (
    <div className="bg-white w-screen h-screen flex flex-row justify-center items-center">
      <Outlet />
    </div>
  );
};
