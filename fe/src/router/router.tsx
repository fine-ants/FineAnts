import { User } from "@api/auth";
import MyProfilePage from "@pages/ProfilePage/MyProfilePage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import {
  Navigate,
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
        {/* TODO : 테스트를 위해 ProtectedRoute 외부에 선언합니다. user 정보가 생기면 ProtectedRoute 내부로 옮기겠습니다. */}
        <Route
          path={Routes.PROFILE}
          element={<Navigate to={`${Routes.PROFILE}/${Routes.PORTFOLIOS}`} />}
        />
        <Route
          path={`${Routes.PROFILE}/:section`}
          element={<MyProfilePage />}
        />
        <Route element={<ProtectedRoute user={user} />}>
          {/* <Route index path={Routes.DASHBOARD} element={<DashboardPage />} /> */}
          {/* <Route path={Routes.PORTFOLIO} element={<PortfolioPage />} /> */}
          {/* <Route path={Routes.PORTFOLIOSTOCK} element={<PortfolioStockPage />}/> */}

          {/* <Route path={Routes.WATCHLIST} element={<WatchListPage />}/> */}
        </Route>

        <Route element={<PublicOnlyRoute user={user} />}>
          {/* <Route index path={Routes.SIGNIN} element={<SignInPage />} /> */}
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
        </Route>

        {/* <Route path={Routes.INDICES} element={<IndicesPage />}/> */}
        {/* <Route path={Routes.STOCK} element={<StockPage />}/> */}
        {/* <Route path={Routes.FALLBACK} element={<NotFoundPage />}/> */}
      </Route>
    )
  );
