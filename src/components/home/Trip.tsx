import { calcRemainingDays } from "../../utils/common";
import { Dday, Element, Image, Info } from "./Trip.styled";
import defaultImg from "../../assets/images/trip-default-img.webp";

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

  return (
    <Element>
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
          {new Intl.DateTimeFormat().format(props.start_date)}{" "}
          {props.start_date < props.end_date
            ? `~ ${new Intl.DateTimeFormat().format(props.end_date)}`
            : ""}
        </span>
      </Info>
    </Element>
  );
}

export default Trip;
