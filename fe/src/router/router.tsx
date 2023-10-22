import { User } from "@api/auth";
import { WindowProvider } from "@context/WindowContext";
import SignInPage from "@pages/SignInPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import Routes from "./Routes";

export default (user: User | undefined) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<ProtectedRoute user={user} />}>
          {/* <Route index path={Routes.DASHBOARD} element={<DashboardPage />} /> */}

          {/* <Route path="/profile"> */}
          {/* <Route path={Routes.PROFILEEDIT} element={<ProfileEditPage />} /> */}
          {/* <Route path={Routes.PORTFOLIOS} element={<PortfoliosPage />} /> */}
          {/* </Route> */}

          {/* <Route path={Routes.PORTFOLIO} element={<PortfolioPage />} /> */}
          {/* <Route path={Routes.PORTFOLIOSTOCK} element={<PortfolioStockPage />}/> */}

          {/* <Route path={Routes.WATCHLIST} element={<WatchListPage />}/> */}
        </Route>

        <Route
          element={
            <WindowProvider>
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <PublicOnlyRoute user={user} />
              </GoogleOAuthProvider>
            </WindowProvider>
          }>
          <Route index path={Routes.SIGNIN} element={<SignInPage />} />
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
        </Route>

        {/* <Route path={Routes.INDICES} element={<IndicesPage />}/> */}
        {/* <Route path={Routes.STOCK} element={<StockPage />}/> */}
        {/* <Route path={Routes.FALLBACK} element={<NotFoundPage />}/> */}
      </Route>
    )
  );
