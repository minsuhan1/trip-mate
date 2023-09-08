import { useAuthState } from "../contexts/auth-context";
import { Navigate } from "react-router-dom";
import { signOut } from "../services/firebase";

const HomePage = function () {
  const authCtx = useAuthState();
  const handleLogout = () => {
    signOut();
  };

  switch (authCtx.state) {
    case "loading":
      // 로딩페이지
      return <div>로그인 중...</div>;
    case "loaded":
      if (authCtx.isAuthenticated) {
        return (
          <>
            <div>HomePage</div>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        );
      } else {
        return <Navigate to="/login" replace />;
      }
    case "error":
      // 에러페이지
      return <div>에러 페이지</div>;
  }
};

export default HomePage;
