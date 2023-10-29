import React from "react";
import { ISchedule, IScheduleList } from "../../store/scheduleReducer";
import Info from "./Info";
import { StyledSlider } from "./List.styled";

function List({
  schedules,
  onIdxChange,
}: {
  schedules: IScheduleList;
  onIdxChange: (idx: number) => void;
}) {
  const settings = {
    centerMode: true,
    infinite: true,
    arrows: false,
    centerPadding: "40px",
    slidesToShow: 1,
    speed: 500,
    afterChange: onIdxChange,
    focusOnSelect: true,
  };

  // [Bug] slick slider item이 바뀌어도 index가 그대로 유지되는 현상
  // [Fix] Slider에 key prop을 지정하여 해결
  return (
    <StyledSlider {...settings} key={Date.now()}>
      {schedules.map((schedule: ISchedule, idx) => (
        <Info key={schedule.id} schedule={schedule.data} idx={idx} />
      ))}
    </StyledSlider>
  );
}

export default React.memo(List);
