import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FloatingAddButton from "../common/FloatingAddButton/FloatingAddButton";
import TabMenu from "../common/TabMenu/TabMenu";
import { StyledDiv, List } from "./ScheduleList.styled";
import { useAppSelector } from "../../hooks/useApp";
import { MILLISEC_1DAY } from "../../constants/constants";
import { ISchedule } from "../../store/scheduleReducer";
import Schedule from "./Schedule";

function ScheduleList() {
  const navigate = useNavigate();
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

    // N일차 목록을 표시하는 필터 메뉴 구성
    for (let i = 0; i < daysOfTrip; i++) {
      menuArr.push({
        label: `${i + 1}일차`,
        onClick: () => {
          setTabIdx(i);
        },
      });
    }
  }

  // N일차 스케줄 표시
  // tabIdx 변경 감지
  useEffect(() => {
    if (tripData) {
      // N일차 00:00:00.000
      const from = tripData.start_date + MILLISEC_1DAY * tabIdx;
      // N+1일차 00:00:00.000
      const to = from + MILLISEC_1DAY;
      // [from, to] 사이의 스케줄만 필터링 후 시작시간 순으로 정렬
      setSchedules(
        initSchedules
          ?.filter(
            (schedule, idx) =>
              from <= schedule.data.start_time && schedule.data.start_time < to
          )
          .sort(
            (a: ISchedule, b: ISchedule) =>
              a.data.start_time - b.data.start_time
          )
      );
    }
  }, [initSchedules, tabIdx, tripData]);

  return (
    <StyledDiv>
      <TabMenu menuArr={menuArr} curTabIdx={tabIdx} />
      {schedules && schedules.length > 0 ? (
        <List>
          {schedules.map((schedule: ISchedule, idx) => (
            <Schedule
              key={schedule.id}
              id={schedule.id}
              title={schedule.data.title}
              start_time={schedule.data.start_time}
              end_time={schedule.data.end_time}
              address={schedule.data.address}
              description={schedule.data.description}
              isOddIdx={idx % 2 === 1}
            />
          ))}
        </List>
      ) : (
        <div></div>
      )}
      <FloatingAddButton
        onClick={() => {
          navigate(`schedule/create?day=${tabIdx + 1}`);
        }}
      />
    </StyledDiv>
  );
}

export default ScheduleList;
