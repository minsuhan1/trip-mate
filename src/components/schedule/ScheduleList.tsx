import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FloatingAddButton from "../common/FloatingAddButton/FloatingAddButton";
import TabMenu from "../common/TabMenu/TabMenu";
import { StyledDiv, List } from "./styles/ScheduleList.styled";
import { useAppSelector } from "../../hooks/useApp";
import { MILLISEC_1DAY } from "../../constants/constants";
import { ISchedule } from "../../store/scheduleReducer";
import Schedule from "./Schedule";
import Empty from "./Empty";

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

  // 리스트 스크롤을 내리면 FAB 숨기고, 올리면 다시 표시
  const listRef = useRef<HTMLUListElement>(null);
  let prevScrollPos = 0;
  let throttle: any; // 스로틀링
  const fab = document.querySelector<HTMLElement>(".floating-btn")!;

  const onScroll = () => {
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;
        if (listRef.current) {
          // 현재 스크롤 값
          let currentScrollPos = listRef.current.scrollTop;

          // 사파리 scroll bounce 대응
          // - scrollTop < 0인 경우 리턴
          // - 스크롤 값이 최대 스크롤 값을 넘으면 리턴
          if (
            currentScrollPos < 0 ||
            listRef.current.scrollTop >
              listRef.current.scrollHeight - listRef.current.clientHeight
          )
            return;

          // 스크롤 down/up 처리
          if (prevScrollPos < currentScrollPos) {
            fab.style.bottom = "-100px";
          } else {
            fab.style.bottom = "100px";
          }

          prevScrollPos = currentScrollPos;
        }
      }, 200);
    }
  };

  return (
    <StyledDiv>
      <TabMenu menuArr={menuArr} curTabIdx={tabIdx} />
      {schedules && schedules.length > 0 ? (
        <List onScroll={onScroll} ref={listRef}>
          {schedules.map((schedule: ISchedule, idx) => (
            <Schedule
              key={schedule.id}
              id={schedule.id}
              trip_id={schedule.data.trip_id}
              title={schedule.data.title}
              start_time={schedule.data.start_time}
              end_time={schedule.data.end_time}
              place_name={schedule.data.map_data?.name}
              description={schedule.data.description}
              isOddIdx={idx % 2 === 1}
            />
          ))}
        </List>
      ) : (
        <List>
          <Empty />
        </List>
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
