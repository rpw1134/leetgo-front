import { createBrowserRouter } from "react-router-dom";
import { Splash } from "./routes/Splash";
import { Error } from "./routes/Error";
import { Signup } from "./routes/Signup";
import { Root } from "./routes/Root";

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
    ],
  },
]);
