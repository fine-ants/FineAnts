import { User } from "@api/auth";
import { GOOGLE_CLIENT_ID } from "@constants/config";
import { WindowProvider } from "@context/WindowContext";
import DashboardPage from "@pages/DashboardPage";
import PortfolioPage from "@pages/PortfolioPage";
import MyProfilePage from "@pages/ProfilePage/MyProfilePage";
import SignInPage from "@pages/SignInPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import WatchlistPage from "@pages/WatchlistPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import Routes from "./Routes";

const router = (user: User | undefined) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* TODO : 테스트를 위해 ProtectedRoute 외부에 선언합니다. user 정보가 생기면 ProtectedRoute 내부로 옮기겠습니다. */}
        <Route
          path={Routes.PROFILE}
          element={<Navigate to={`${Routes.PROFILE}/${Routes.PORTFOLIOS}`} />}
        />
        <Route
          path={`${Routes.PROFILE}/:section`}
          element={<MyProfilePage />}
        />
        <Route path={Routes.PORTFOLIO} element={<PortfolioPage />} />
        <Route index path={Routes.DASHBOARD} element={<DashboardPage />} />
        <Route path={Routes.WATCHLIST} element={<WatchlistPage />} />
        {/* TOOD: 임시적으로 ProtectedRoute 외부에 선언 */}

        <Route element={<ProtectedRoute user={user} />}>
          {/* <Route index path={Routes.DASHBOARD} element={<DashboardPage />} /> */}
          {/* <Route path={Routes.PORTFOLIOHOLDING} element={<PortfolioHoldingPage />}/> */}
          {/* <Route path={Routes.WATCHLIST} element={<WatchlistPage />} /> */}
        </Route>

        <Route
          element={
            <WindowProvider>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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

export default router;
