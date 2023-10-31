import { UserContext } from "@context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { deleteSignOut } from "api/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";

export default function useSignOutMutation() {
  const navigate = useNavigate();
  const { onSignOut } = useContext(UserContext);

  return useMutation({
    mutationFn: deleteSignOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      onSignOut();

      navigate(Routes.SIGNIN);
    },
  });
}
