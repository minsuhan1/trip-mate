import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useApp";
import { MILLISEC_1DAY } from "../../constants/constants";
import { ISchedule } from "../../store/scheduleReducer";
import TabMenu from "../../components/common/TabMenu/TabMenu";
import Map from "../../components/place-overview/Map";
import { Empty, Wrapper } from "./PlaceOverviewPage.styled";
import { ReactComponent as MapEmptyIllust } from "../../assets/illustrations/map-empty.svg";

function PlaceOverviewPage() {
  const params = useParams();
  const tripId = params.tripId; // URL의 여행ID

  // 여행 정보
  const tripData = useAppSelector(
    (state) =>
      state.triplistReducer.state?.find((trip) => trip.id === tripId)?.data
  );
  // 스케줄 목록
  const scheduleList = useAppSelector(
    (state) => state.scheduleListReducer.state
  );

  const [tabIdx, setTabIdx] = useState(0); // 현재 탭 인덱스
  let menuArr = []; // 각 탭의 내용
  let daysOfTrip; // 여행기간 (N일)

  const initSchedules = scheduleList;
  const [schedules, setSchedules] = useState(initSchedules); // 스케줄 상태

  if (tripData) {
    // 여행 기간 구하기
    daysOfTrip = Math.ceil(
      (tripData.end_date - tripData.start_date) / MILLISEC_1DAY
    );

    menuArr.push({
      label: "전체",
      onClick: () => {
        setTabIdx(0);
      },
    });

    // N일차 목록을 표시하는 필터 메뉴 구성
    for (let i = 0; i < daysOfTrip; i++) {
      menuArr.push({
        label: `${i + 1}일차`,
        onClick: () => {
          setTabIdx(i + 1);
        },
      });
    }
  }

  // N일차 스케줄 표시
  // tabIdx 변경 감지
  useEffect(() => {
    if (tripData) {
      // 전체 (mapData가 있는 스케줄만)
      if (tabIdx === 0) {
        setSchedules(
          initSchedules
            ?.filter((schedule, idx) => schedule.data.map_data)
            .sort(
              (a: ISchedule, b: ISchedule) =>
                a.data.start_time - b.data.start_time
            )
        );
      } else {
        // N일차 00:00:00.000
        const from = tripData.start_date + MILLISEC_1DAY * (tabIdx - 1);
        // N+1일차 00:00:00.000
        const to = from + MILLISEC_1DAY;
        // [from, to] 사이의 mapData가 있는 스케줄만 필터링 후 시작시간 순으로 정렬
        setSchedules(
          initSchedules
            ?.filter(
              (schedule, idx) =>
                from <= schedule.data.start_time &&
                schedule.data.start_time < to &&
                schedule.data.map_data
            )
            .sort(
              (a: ISchedule, b: ISchedule) =>
                a.data.start_time - b.data.start_time
            )
        );
      }
    }
  }, [initSchedules, tabIdx, tripData]);

  return (
    <>
      <Wrapper>
        <TabMenu shadow={true} menuArr={menuArr} curTabIdx={tabIdx} />

        {schedules && schedules.length > 0 && <Map schedules={schedules} />}
      </Wrapper>

      {schedules && schedules.length === 0 && (
        <Empty>
          <MapEmptyIllust width={"60%"} height={"40%"} />
          <div>아직 방문 예정인 장소가 없어요</div>
        </Empty>
      )}
    </>
  );
}

export default PlaceOverviewPage;
