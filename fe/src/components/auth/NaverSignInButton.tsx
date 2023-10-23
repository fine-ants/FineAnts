import { CLIENT_URL, NAVER_CLIENT_ID } from "@constants/config";
import { useEffect } from "react";
import styled from "styled-components";

export default function NaverSignInButton() {
  const naverLogin = new (window as any).naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: `${CLIENT_URL}/signin?provider=naver`,
    isPopup: true,
    loginButton: {
      color: "green",
      type: 3,
      height: 40,
    },
  });

  useEffect(() => {
    naverLogin.init();
  }, []);

  return <StyledNaverSignInButton id="naverIdLogin" />;
}

const StyledNaverSignInButton = styled.div``;
