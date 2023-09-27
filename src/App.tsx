import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuthState } from "./contexts/auth-context";
import { useAppDispatch } from "./hooks/useApp";

import RootPage from "./pages/RootPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import ProfileEditPage from "./pages/profile/ProfileEditPage";
import NotFound from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import { getProfileInfo } from "./store/profileReducer";

// vh를 브라우저 상하단 메뉴를 제외한 화면 크기를 기반으로 설정
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}

// 화면 사이즈가 바뀌면 vh 다시 계산
window.addEventListener("resize", () => setScreenSize());

function App() {
  // 처음 마운트될때 vh 값을 계산
  useEffect(() => {
    setScreenSize();
  }, []);

  const authCtx = useAuthState();
  const dispatch = useAppDispatch();

  // 프로필 정보 로더
  const profileLoader = async () => {
    console.log("loader");
    if (authCtx.state === "loaded" && authCtx.isAuthenticated === true) {
      await dispatch(getProfileInfo(authCtx.user.uid));
      return null;
    }
    return null;
  };

  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootPage />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />

        {/* PrivateRoutes를 적용할 Route끼리 모은다 */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/profile/edit"
            element={<ProfileEditPage />}
            loader={profileLoader}
          />
          <Route path="/home" element={<HomePage />} loader={profileLoader} />
        </Route>

        {/* Not Found Page */}
      </>
    ),
    { basename: process.env.PUBLIC_URL }
  );

  return <RouterProvider router={router} />;
}

export default App;