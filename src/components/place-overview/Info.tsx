import { IScheduleData } from "../../store/scheduleReducer";
import { ReactComponent as MapPinIcon } from "../../assets/icons/map-pin.svg";
import { Container } from "./Info.styled";

function Info({ schedule, idx }: { schedule: IScheduleData; idx: number }) {
  return (
    <>
      <Container>
        <div className="idx">
          <label>{idx + 1}</label>
        </div>
        {/* 장소명 */}
        <h1>{schedule.map_data!.name}</h1>
        {/* 주소 */}
        <div className="address">
          <MapPinIcon width={"1.2rem"} />
          <p>{schedule.map_data!.address}</p>
        </div>
        {/* 시간 */}
        <div className="time">
          <div>
            {new Date(schedule.start_time).toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>&ndash;</div>
          <div>
            {new Date(schedule.end_time).toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        {/* 설명 */}
        {schedule.description && (
          <div className="description">{schedule.description}</div>
        )}
      </Container>
    </>
  );
}

export default Info;
