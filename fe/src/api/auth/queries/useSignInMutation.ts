import { UserContext } from "@context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
import { postSignIn } from "../index";

export default function useSignInMutation() {
  const navigate = useNavigate();
  const { onSignIn } = useContext(UserContext);

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: ({ data }) => {
      const {
        jwt: { accessToken, refreshToken },
        user,
      } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      onSignIn(user);

      navigate(Routes.DASHBOARD);
    },
  });
}
