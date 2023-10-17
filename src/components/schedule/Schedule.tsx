import { Color, Element, Info, Time } from "./Schedule.styled";

interface ScheduleProp {
  id: string;
  title: string;
  description?: string;
  address?: string;
  start_time: number;
  end_time: number;
  isOddIdx: boolean;
}

function Schedule(props: ScheduleProp) {
  return (
    <Element>
      {/* 라벨 색 */}
      <Color
        style={{
          backgroundColor: props.isOddIdx
            ? "var(--third-color)"
            : "var(--primary-color)",
        }}
      ></Color>
      {/* 시간 */}
      <Time>
        <div>
          {new Date(props.start_time).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div>&ndash;</div>
        <div>
          {new Date(props.end_time).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </Time>
      {/* 제목, 설명, 주소 */}
      <Info>
        <h1>{props.title}</h1>
        {props.description && <h2>{props.description}</h2>}
        {props.address && <p>{props.address}</p>}
      </Info>
    </Element>
  );
}

export default Schedule;
