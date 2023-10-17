import useUserInfoQuery from "@api/auth/queries/useUserInfoQuery";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/GlobalStyles";

export default function App() {
  const { data: user } = useUserInfoQuery();

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />

      <StyledApp>
        <RouterProvider router={router(user)} />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  width: 100%;
  min-height: inherit;
  position: relative;
  overflow: hidden;
`;
