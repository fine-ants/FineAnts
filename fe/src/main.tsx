import { UserProvider } from "@context/UserContext.tsx";
import { StyledEngineProvider } from "@mui/styled-engine";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import browserServiceWorker from "./mocks/browserServiceWorker.ts";

if (process.env.NODE_ENV === "development") {
  browserServiceWorker.start({
    onUnhandledRequest: "warn",
  });
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
