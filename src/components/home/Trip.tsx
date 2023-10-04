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
  const remainingDays = calcRemainingDays(props.start_date);

  return (
    <Element>
      <Image>
        <img src={props.image || defaultImg} alt="trip-pic" />
      </Image>
      <Info>
        <Dday $day={remainingDays}>
          <label>
            D{remainingDays > 0 ? "-" : "+"}
            {Math.abs(remainingDays)}
          </label>
        </Dday>
        <h1>{props.title}</h1>
        <span>
          {new Intl.DateTimeFormat().format(props.start_date)} ~{" "}
          {new Intl.DateTimeFormat().format(props.end_date)}
        </span>
      </Info>
    </Element>
  );
}

export default Trip;
