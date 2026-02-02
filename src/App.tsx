import { RouterProvider } from "react-router-dom";
import { router } from "./routing/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./context/UserContextProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
