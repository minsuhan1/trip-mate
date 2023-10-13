import { calcRemainingDays } from "../../utils/common";
import { Dday, Element, Image, Info } from "./Trip.styled";
import defaultImg from "../../assets/images/trip-default-img.webp";
import { useNavigate } from "react-router-dom";
import { MILLISEC_1DAY } from "../../constants/constants";

interface TripProp {
  id: string;
  title: string;
  image: string | undefined;
  start_date: number;
  end_date: number;
}

function Trip(props: TripProp) {
  const remainingDays = calcRemainingDays(props.start_date); // D-DAY
  const today = Date.now();
  const navigate = useNavigate();

  return (
    <Element
      onClick={() => {
        navigate(`/trip/${props.id}`);
      }}
    >
      <Image>
        <img src={props.image || defaultImg} alt="trip-pic" />
      </Image>
      <Info>
        <Dday
          $color={
            props.start_date <= today && today < props.end_date
              ? ["#970000", "#FFCACA"]
              : props.start_date > today
              ? ["#5500C1", "#E0D8FF"]
              : ["#000000", "#D9D9D9"]
          }
        >
          <label>
            {props.start_date <= today && today < props.end_date
              ? "NOW"
              : (remainingDays > 0 ? `D-` : `D+`) +
                `${Math.abs(remainingDays)}`}
          </label>
        </Dday>
        <h1>{props.title}</h1>
        <span>
          {/* end_date는 23시 59분 59초로 설정되어 있어서 해당 밀리초만큼 빼야함 */}
          {new Date(props.start_date).toLocaleDateString("ko-KR")}{" "}
          {props.start_date < props.end_date - (MILLISEC_1DAY - 1)
            ? `~ ${new Date(props.end_date).toLocaleDateString("ko-KR")}`
            : ""}
        </span>
      </Info>
    </Element>
  );
}

export default Trip;
