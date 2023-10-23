import { useEffect } from "react";
import styled from "styled-components";

export default function NaverSignInButton() {
  const naverLogin = new (window as any).naver.LoginWithNaverId({
    clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
    callbackUrl: `${import.meta.env.VITE_CLIENT_URL}/signin?provider=naver`,
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
