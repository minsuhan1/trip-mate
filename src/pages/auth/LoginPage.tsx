import { signIn } from "../../utils/auth/firebase";
import { useAuthState } from "../../contexts/auth-context";
import { Navigate } from "react-router-dom";
import AuthButton from "../../components/auth/AuthButton";
import GoogleIcon from "../../assets/icons/icon_google.svg";
import logo from "../../assets/images/logo.png";
import FlexContainer from "../../styles/flexContainer";
import * as S from "./LoginPage.styled";
import { useEffect } from "react";
import { useModal } from "../../contexts/modal-context";
import InstallApp from "../../components/modal-contents/InstallApp";

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

function LoginPage() {
  // 인증 상태 가져오기
  const authCtx = useAuthState();

  // copyright year
  const year = new Date().getFullYear();

  // 구글 로그인 버튼 handler
  const handleLogin = () => {
    signIn();
  };

  const { openModal } = useModal();

  const isMobile =
    typeof window !== "undefined" &&
    /iphone|ipad|ipod|android/i.test(window.navigator.userAgent);

  useEffect(() => {
    if (isMobile && !window.navigator.standalone) {
      (async () => {
        setTimeout(() => openModal(<InstallApp />), 1000);
      })();
    }
  }, []);

  return authCtx.state === "loaded" && authCtx.isAuthenticated === true ? (
    <Navigate to="/branding" />
  ) : (
    <>
      <S.Background>
        <S.Overlay>
          <S.Main>
            <header>
              <S.Logo src={logo} />
              <p>여행의 모든 순간을</p>
              <p>계획하다</p>
            </header>
            <FlexContainer gapValue={10}>
              <AuthButton
                onClick={handleLogin}
                text="구글로 로그인"
                icon={GoogleIcon}
                color="#FFFFFF"
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
