import { useAuthState } from "../contexts/auth-context";
import { Navigate } from "react-router-dom";

const RootPage = function () {
  const authCtx = useAuthState();

  switch (authCtx.state) {
    case "loading":
      // 로딩페이지
      return <div>로그인 중...</div>;
    case "loaded":
      if (authCtx.isAuthenticated) {
        return <Navigate to="/home" replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    case "error":
      // 에러페이지
      return <Navigate to="/login" replace />;
  }
};

export default RootPage;
