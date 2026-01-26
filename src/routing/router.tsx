import { createBrowserRouter } from "react-router-dom";
import { Splash } from "./routes/Splash";
import { Error } from "./routes/Error";
import { Signup } from "./routes/Signup";
import { Waitlist } from "./routes/Waitlist";
import { Root } from "./routes/Root";
import Sandbox from "./routes/Sandbox";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Splash />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "waitlist",
        element: <Waitlist />,
      },
      {
        path: "sandbox",
        element: <Sandbox />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
