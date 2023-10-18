import { ProductItemsFiltersProvider } from "@context/ProductItemsFiltersContext";
import { User } from "api/user";
import { Navigate, Outlet } from "react-router-dom";
import Routes from "./Routes";

export default function ProtectedRoute({ user }: { user: User | undefined }) {
  return user ? (
    <ProductItemsFiltersProvider>
      <Outlet />
    </ProductItemsFiltersProvider>
  ) : (
    <Navigate to={Routes.SIGNIN} />
  );
}
