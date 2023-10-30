import React, { useEffect, useMemo, useCallback } from "react";
import {
  LoaderFunctionArgs,
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
import ScheduleEditPage from "./pages/schedule/ScheduleEditPage";
import { getScheduleList } from "./store/scheduleReducer";
import MapSelector from "./components/forms/schedule/MapSelector";
import PlaceOverviewPage from "./pages/place-overview/PlaceOverviewPage";
import ChecklistPage from "./pages/checklist/ChecklistPage";
import { getChecklist } from "./store/checklistReducer";

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

  // 인증 상태 컨텍스트
  const authCtx = useAuthState();
  // Redux dispatch, states
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profileReducer);
  const triplist = useAppSelector((state) => state.triplistReducer);
  const scheduleList = useAppSelector((state) => state.scheduleListReducer);

  // 프로필 정보 로더
  const profileLoader = useCallback(async () => {
    // 로그인 상태이고 프로필 정보가 확인되지 않은 경우 디스패치
    if (authCtx.user && profile.status !== "loaded") {
      await dispatch(getProfileInfo(authCtx.user.uid));
      return null;
    }
    return null;
  }, [authCtx.user, profile.status]);

  // 여행일정목록 로더
  const triplistLoader = useCallback(async () => {
    // 로그인 상태이고 여행일정목록이 확인되지 않은 경우 디스패치
    if (authCtx.user && triplist.status !== "loaded") {
      await dispatch(getTriplist(authCtx.user.uid));
      return null;
    }
    return null;
  }, [authCtx.user, triplist.status]);

  // 스케줄 로더: 현재 여행id에 대한 스케줄 목록을 로드한다
  const scheduleListLoader = useCallback(
    async ({ params }: LoaderFunctionArgs) => {
      // 새 스케줄 목록을 가져오는 조건
      // - 현재 스케줄의 tripId와 페이지 param의 tripId가 다른 경우
      if (authCtx.user && params && params.tripId) {
        await dispatch(
          getScheduleList({
            uid: authCtx.user.uid,
            tripId: params.tripId as string,
          })
        );
        return null;
      }
      return null;
    },
    [authCtx.user]
  );

  // 체크리스트 로더
  const checklistLoader = useCallback(
    async ({ params }: LoaderFunctionArgs) => {
      if (authCtx.user && params.tripId) {
        await dispatch(
          getChecklist({
            uid: authCtx.user.uid,
            tripId: params.tripId as string,
          })
        );
        return null;
      }
      return null;
    },
    [authCtx.user]
  );

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

            <Route
              path="/trip/:tripId/schedule/create"
              element={<ScheduleEditPage />}
            />

            <Route
              path="/trip/:tripId"
              element={<BottomNav />}
              loader={scheduleListLoader}
            >
              <Route index={true} element={<MainPage />} />

              <Route path="/trip/:tripId/map" element={<PlaceOverviewPage />} />

              <Route
                path="/trip/:tripId/checklist"
                element={<ChecklistPage />}
                loader={checklistLoader}
              />
            </Route>
          </Route>

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </>
      ),
      { basename: process.env.PUBLIC_URL }
    );
  }, [profileLoader, triplistLoader, scheduleListLoader, checklistLoader]);

  return <RouterProvider router={router} />;
}

export default App;
