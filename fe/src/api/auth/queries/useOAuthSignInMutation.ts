import { OAuthProvider, postOAuthSignIn } from "@api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
import useUserInfoQuery from "./useUserInfoQuery";

export default function useOAuthSignInMutation() {
  const navigate = useNavigate();
  const { refetch: fetchUserInfo } = useUserInfoQuery();

  return useMutation({
    mutationFn: ({
      provider,
      authCode,
    }: {
      provider: OAuthProvider;
      authCode: string;
    }) => postOAuthSignIn(provider, authCode),
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      fetchUserInfo();

      navigate(Routes.DASHBOARD);
    },
  });
}
