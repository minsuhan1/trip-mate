import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useApp";
import { StyledDiv } from "./styles/Banner.styled";
import defaultImg from "../../assets/images/trip-default-img.webp";
import BannerTopNav from "./BannerTopNav";
import { MILLISEC_1DAY } from "../../constants/constants";

function Banner() {
  const params = useParams();
  const tripId = params.tripId;
  const tripData = useAppSelector(
    (state) =>
      state.triplistReducer.state?.find((trip) => trip.id === tripId)?.data
  );

  return tripData ? (
    <StyledDiv $background={tripData.image || defaultImg}>
      <BannerTopNav />
      <div className="info">
        <p>
          {/* end_date는 23시 59분 59초로 설정되어 있어서 해당 밀리초만큼 빼야함 */}
          {new Date(tripData.start_date).toLocaleDateString("ko-KR")}{" "}
          {tripData.start_date < tripData.end_date - (MILLISEC_1DAY - 1)
            ? `~ ${new Date(tripData.end_date).toLocaleDateString("ko-KR")}`
            : ""}
        </p>
        <h1>{tripData.title}</h1>
      </div>
    </StyledDiv>
  ) : (
    <div></div>
  );
}

export default Banner;
