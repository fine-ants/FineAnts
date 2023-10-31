import { Navigate, Outlet } from "react-router-dom";
import Routes from "./Routes";
import { User } from "api/auth";

export default function PublicOnlyRoute({ user }: { user: User | undefined }) {
  return user ? <Navigate to={Routes.DASHBOARD} /> : <Outlet />;
}
