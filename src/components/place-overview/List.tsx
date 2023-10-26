import Slider from "react-slick";
import { ISchedule, IScheduleList } from "../../store/scheduleReducer";
import Info from "./Info";
import { StyledSlider } from "./List.styled";

function List({ schedules }: { schedules: IScheduleList }) {
  const settings = {
    centerMode: true,
    infinite: true,
    arrows: false,
    centerPadding: "40px",
    slidesToShow: 1,
    speed: 500,
  };

  return (
    <StyledSlider {...settings}>
      {schedules.map((schedule: ISchedule, idx) => (
        <Info key={schedule.id} schedule={schedule.data} idx={idx} />
      ))}
    </StyledSlider>
  );
}

export default List;
