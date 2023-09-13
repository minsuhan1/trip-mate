import { useEffect } from "react";
import { signIn } from "../services/firebase";
import { useAuthState } from "../contexts/auth-context";
import { Navigate } from "react-router-dom";
import AuthButton from "../components/AuthButton/AuthButton";
import GoogleIcon from "../assets/images/icon_google.svg";
import KakaoIcon from "../assets/images/icon_kakao.svg";
import logo from "../assets/images/logo.png";
import FlexContainer from "../styles/flexContainer";
import * as S from "../styles/Login.styled";

function LoginPage() {
  // 인증 상태 가져오기
  const authCtx = useAuthState();

  // copyright year
  const year = new Date().getFullYear();

  // 구글 로그인 버튼 handler
  const handleLogin = () => {
    signIn();
  };

  // 로그인 상태인 경우 홈으로 redirect
  if (authCtx.state === "loaded" && authCtx.isAuthenticated === true) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <S.Background>
        <S.Overlay>
          <S.Main>
            <S.Logo src={logo} />
            <FlexContainer gapValue={10}>
              <AuthButton
                onClick={handleLogin}
                text="구글로 로그인"
                icon={GoogleIcon}
                color="#FFFFFF"
              />
              <AuthButton
                onClick={handleLogin}
                text="카카오로 로그인"
                icon={KakaoIcon}
                color="#FEE500"
              />
              <S.Footer>
                <FlexContainer>
                  {`\u00A9 ${year}. TRIP-MATE. All rights reserved.`}
                </FlexContainer>
              </S.Footer>
            </FlexContainer>
          </S.Main>
        </S.Overlay>
      </S.Background>
    </>
  );
}

export default LoginPage;
