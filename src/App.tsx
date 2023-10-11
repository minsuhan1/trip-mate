import React, { useEffect, useMemo } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuthState } from "./contexts/auth-context";
import { useAppDispatch, useAppSelector } from "./hooks/useApp";

import RootPage from "./pages/RootPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import ProfileEditPage from "./pages/profile/ProfileEditPage";
import NotFound from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import { getProfileInfo } from "./store/profileReducer";
import TripEditPage from "./pages/trip/TripEditPage";
import { getTriplist } from "./store/triplistReducer";
import BottomNav from "./layouts/bottom-nav/BottomNav";
import MainPage from "./pages/schedule/MainPage";

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
  const profile = useAppSelector((state) => state.profileReducer);
  const triplist = useAppSelector((state) => state.triplistReducer);

  // 프로필 정보 로더
  const profileLoader = async () => {
    // 로그인 상태이고 프로필 정보가 확인되지 않은 경우 디스패치
    if (
      authCtx.state === "loaded" &&
      authCtx.isAuthenticated === true &&
      profile.status !== "loaded"
    ) {
      await dispatch(getProfileInfo(authCtx.user.uid));
      return null;
    }
    return null;
  };

  // 여행일정목록 로더
  const triplistLoader = async () => {
    // 로그인 상태이고 프로필 정보가 확인되지 않은 경우 디스패치
    if (
      authCtx.state === "loaded" &&
      authCtx.isAuthenticated === true &&
      triplist.status !== "loaded"
    ) {
      await dispatch(getTriplist(authCtx.user.uid));
      return null;
    }
    return null;
  };

  // Router
  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route
            index
            path="/"
            element={<RootPage />}
            errorElement={<ErrorPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />

          {/* PrivateRoutes를 적용할 Route끼리 모은다 */}
          <Route element={<PrivateRoutes />}>
            <Route
              path="/profile/edit"
              element={<ProfileEditPage />}
              loader={profileLoader}
            />
            <Route
              path="/home"
              element={<HomePage />}
              loader={triplistLoader}
            />
            <Route path="/create" element={<TripEditPage />} />

            <Route element={<BottomNav />}>
              <Route path="/trip/:tripId" element={<MainPage />} />
            </Route>
          </Route>

          {/* Not Found Page */}
        </>
      ),
      { basename: process.env.PUBLIC_URL }
    );
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
