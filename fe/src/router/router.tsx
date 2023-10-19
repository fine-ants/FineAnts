import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MyProfilePage from "../pages/ProfilePage/MyProfilePage";
import PublicOnlyRoute from "./PublicOnlyRoute";
import Routes from "./Routes";

type User = {}; // TODO: 다른 파일로 이동

export default (user: User | undefined) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path={`${Routes.PROFILE}/:section`}
          element={<MyProfilePage />}
        />

        <Route element={<PublicOnlyRoute user={user} />}>
          {/* <Route path={Routes.DASHBOARD} element={<DashboardPage />} /> */}

          {/* <Route path="/profile"> */}
          {/* <Route path={Routes.PROFILEEDIT} element={<ProfileEditPage />} /> */}
          {/* <Route path={Routes.PORTFOLIOS} element={<PortfoliosPage />} /> */}
          {/* </Route> */}

          {/* <Route path={Routes.PORTFOLIO} element={<PortfolioPage />} /> */}
          {/* <Route path={Routes.PORTFOLIOSTOCK} element={<PortfolioStockPage />}/> */}

          {/* <Route path={Routes.WATCHLIST} element={<WatchListPage />}/> */}
        </Route>

        <Route element={<PublicOnlyRoute user={user} />}>
          {/* <Route path={Routes.SIGNIN} element={<SignInPage />}/> */}
          {/* <Route path={Routes.SIGNUP} element={<SignUpPage />}/> */}
        </Route>

        {/* <Route path={Routes.INDICES} element={<IndicesPage />}/> */}
        {/* <Route path={Routes.STOCK} element={<StockPage />}/> */}
        {/* <Route path={Routes.FALLBACK} element={<NotFoundPage />}/> */}
      </Route>
    )
  );
