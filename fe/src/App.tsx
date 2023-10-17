import useUserInfoQuery from "@api/auth/queries/useUserInfoQuery";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/GlobalStyles";

export default function App() {
  const { data: user } = useUserInfoQuery();

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <RouterProvider router={router(user)} />
    </ThemeProvider>
  );
}
