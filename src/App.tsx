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
import ErrorPage from "./pages/ErrorPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import { getProfileInfo } from "./store/profileReducer";
import TripEditPage from "./pages/trip/TripEditPage";
import { getTriplist } from "./store/triplistReducer";
import BottomNav from "./layouts/bottom-nav/BottomNav";
import MainPage from "./pages/schedule/MainPage";
import ScheduleEditPage from "./pages/schedule/ScheduleEditPage";
import { getScheduleList } from "./store/scheduleReducer";
import PlaceOverviewPage from "./pages/place-overview/PlaceOverviewPage";
import ChecklistPage from "./pages/checklist/ChecklistPage";
import { getChecklist } from "./store/checklistReducer";
import { useLoadingState } from "./contexts/loading-context";
import { getExpenseList } from "./store/expensesReducer";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import ExpenseEditPage from "./pages/expenses/ExpenseEditPage";
import ExpenseDetailPage from "./pages/expenses/ExpenseDetailPage";
import ProfilePage from "./pages/profile/ProfilePage";
import BrandingPage from "./pages/branding/BrandingPage";

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
  // 로딩 상태 컨텍스트
  const { setLoading } = useLoadingState();
  // Redux dispatch, states
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profileReducer);
  const triplist = useAppSelector((state) => state.triplistReducer);

  // 프로필 정보 로더
  const profileLoader = useCallback(async () => {
    // 로그인 상태이고 프로필 정보가 확인되지 않은 경우 디스패치
    if (authCtx.user && profile.status !== "loaded") {
      setLoading(true);
      await dispatch(getProfileInfo(authCtx.user.uid));
      setLoading(false);
      return null;
    }
    return null;
  }, [authCtx.user, profile.status, setLoading]);

  // 여행일정목록 로더
  const triplistLoader = useCallback(async () => {
    // 로그인 상태이고 여행일정목록이 확인되지 않은 경우 디스패치
    if (authCtx.user) {
      setLoading(true);
      await dispatch(getTriplist(authCtx.user.uid));
      setLoading(false);
      return null;
    }
    return null;
  }, [authCtx.user, triplist.status, setLoading]);

  // 스케줄 로더: 현재 여행id에 대한 스케줄 목록을 로드한다
  const scheduleListLoader = useCallback(
    async ({ params }: LoaderFunctionArgs) => {
      if (authCtx.user && params && params.tripId && triplist.state) {
        // 존재하지 않는 여행id인 경우 뒤로가기
        if (
          ![...triplist.state].map((trip) => trip.id).includes(params.tripId)
        ) {
          window.history.back();
          return;
        }
        setLoading(true);
        await dispatch(
          getScheduleList({
            uid: authCtx.user.uid,
            tripId: params.tripId as string,
          })
        );
        setLoading(false);
        return null;
      }
      return null;
    },
    [authCtx.user, setLoading]
  );

  // 체크리스트 로더
  const checklistLoader = useCallback(
    async ({ params }: LoaderFunctionArgs) => {
      if (authCtx.user && params.tripId) {
        setLoading(true);
        await dispatch(
          getChecklist({
            uid: authCtx.user.uid,
            tripId: params.tripId as string,
          })
        );
        setLoading(false);
        return null;
      }
      return null;
    },
    [authCtx.user, setLoading]
  );

  // 여행경비 로더
  const expenseListLoader = useCallback(
    async ({ params }: LoaderFunctionArgs) => {
      if (authCtx.user && params.tripId) {
        setLoading(true);
        await dispatch(
          getExpenseList({
            uid: authCtx.user.uid,
            tripId: params.tripId as string,
          })
        );
        setLoading(false);
        return null;
      }
      return null;
    },
    [authCtx.user, setLoading]
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
              path="/branding"
              element={<BrandingPage />}
              loader={profileLoader}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
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
              path="/trip/:tripId/expenses/create"
              element={<ExpenseEditPage />}
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

              <Route
                path="/trip/:tripId/expenses"
                element={<ExpensesPage />}
                loader={expenseListLoader}
              />

              <Route
                path="/trip/:tripId/expenses/:id"
                element={<ExpenseDetailPage />}
              />
            </Route>
          </Route>

          {/* Not Found Page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </>
      ),
      { basename: process.env.PUBLIC_URL }
    );
  }, [
    profileLoader,
    triplistLoader,
    scheduleListLoader,
    checklistLoader,
    expenseListLoader,
  ]);

  return <RouterProvider router={router} />;
}

export default App;
