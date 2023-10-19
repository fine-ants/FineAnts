import { Navigate, Outlet } from "react-router-dom";
import Routes from "./Routes";
import { User } from "api/auth";

export default function ProtectedRoute({ user }: { user: User | undefined }) {
  return user ? <Outlet /> : <Navigate to={Routes.SIGNIN} />;
}
