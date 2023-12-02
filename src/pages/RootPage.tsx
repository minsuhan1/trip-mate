import { useAuthState } from "../contexts/auth-context";
import { Navigate } from "react-router-dom";
import { useLoadingState } from "../contexts/loading-context";

const RootPage = function () {
  const authCtx = useAuthState();
  const { setLoading } = useLoadingState();

  switch (authCtx.state) {
    case "loading":
      // 로딩페이지
      setLoading(true);
      return <div></div>;
    case "loaded":
      setLoading(false);
      if (authCtx.isAuthenticated) {
        return <Navigate to="/home" replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    case "error":
      setLoading(false);
      // 에러페이지
      return <Navigate to="/login" replace />;
  }
};

export default RootPage;
