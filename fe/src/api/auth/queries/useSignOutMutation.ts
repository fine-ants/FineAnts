import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSignOut } from "api/auth";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
import { userKeys } from "./queryKeys";

export default function useSignOutMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSignOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      queryClient.resetQueries({
        queryKey: userKeys.info().queryKey,
        exact: true,
      });

      navigate(Routes.SIGNIN);
    },
  });
}
