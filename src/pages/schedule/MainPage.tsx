import { useEffect } from "react";
import Banner from "../../components/schedule/Banner";
import ScheduleList from "../../components/schedule/ScheduleList";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { useLoadingState } from "../../contexts/loading-context";
import { getScheduleList } from "../../store/scheduleReducer";
import { useAuthState } from "../../contexts/auth-context";

function MainPage() {
  const tripId = useParams()?.tripId;
  const isScheduleLoaded = useAppSelector(
    (state) => state.scheduleListReducer
  ).status;
  const dispatch = useAppDispatch();
  const { setLoading } = useLoadingState();
  const authCtx = useAuthState();

  useEffect(() => {
    const loadSchedules = async () => {
      if (authCtx.user) {
        setLoading(true);
        await dispatch(
          getScheduleList({
            uid: authCtx.user.uid,
            tripId: tripId as string,
          })
        );
        setLoading(false);
      }
    };

    if (tripId && isScheduleLoaded !== "loaded") {
      loadSchedules();
    }
  }, []);

  return (
    <>
      <Banner />
      <ScheduleList />
    </>
  );
}

export default MainPage;
