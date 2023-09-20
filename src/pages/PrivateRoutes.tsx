import { useAuthState } from "../contexts/auth-context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const authCtx = useAuthState();

  // Auth Guard Page
  // 인증 정보가 없을 경우 로그인 페이지로 라우팅
  return authCtx.state === "loaded" && !authCtx.isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default PrivateRoutes;
