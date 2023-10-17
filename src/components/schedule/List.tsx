import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FloatingAddButton from "../common/FloatingAddButton/FloatingAddButton";
import TabMenu from "../common/TabMenu/TabMenu";
import { StyledDiv } from "./List.styled";
import { useAppSelector } from "../../hooks/useApp";
import { MILLISEC_1DAY } from "../../constants/constants";

function List() {
  const navigate = useNavigate();
  const params = useParams();
  const tripId = params.tripId;
  const tripData = useAppSelector(
    (state) =>
      state.triplistReducer.state?.find((trip) => trip.id === tripId)?.data
  );

  const [tabIdx, setTabIdx] = useState(0);

  let daysOfTrip;
  let menuArr = [];

  if (tripData) {
    // 여행 기간 (N일)
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

  return (
    <StyledDiv>
      <TabMenu menuArr={menuArr} curTabIdx={tabIdx} />
      <FloatingAddButton
        onClick={() => {
          navigate(`schedule/create?day=${tabIdx + 1}`);
        }}
      />
    </StyledDiv>
  );
}

export default List;
