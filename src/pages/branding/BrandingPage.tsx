import { useState, useRef } from "react";
import SlickItem from "../../components/branding/SlickItem";
import { Container, StyledSlider } from "./BrandingPage.styled";
import Branding_1 from "../../assets/branding/Branding-1.png";
import Branding_2 from "../../assets/branding/Branding-2.png";
import Branding_3 from "../../assets/branding/Branding-3.png";
import Branding_4 from "../../assets/branding/Branding-4.png";
import Branding_5 from "../../assets/branding/Branding-5.png";
import { PageWrapperPadding15 } from "../../styles/page-wrap-padding-15";
import Button from "../../components/common/Button/Button";
import Slider from "react-slick";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useApp";

function BrandingPage() {
  const profile = useAppSelector((state) => state.profileReducer);
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  const [curIdx, setCurIdx] = useState<number>(0);
  const onIdxChange = (idx: number) => {
    setCurIdx(idx);
  };

  if (profile.state) {
    return <Navigate to="/home" />;
  }

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    speed: 500,
    afterChange: onIdxChange,
    infinite: false,
  };

  return (
    <PageWrapperPadding15
      $backgroundColor="#fff"
      style={{ overflow: "hidden" }}
    >
      <Container>
        <StyledSlider {...settings} ref={sliderRef}>
          <SlickItem
            title={`모든 여행계획을\n한눈에 확인해요`}
            description={`지금 진행중인 여행과 다가올 여행,\n다녀온 여행을 D-day와 함께 간편하게\n확인할 수 있어요`}
            imageSrc={Branding_1}
          />
          <SlickItem
            title={`한손에 담기는\n여행 스케줄`}
            description={`진행 시간, 간단한 메모와 장소명을 보여주는\n스케줄을 여행 기간동안 일차별로\n확인할 수 있어요`}
            imageSrc={Branding_2}
          />
          <SlickItem
            title={`방문할 장소들을\n손쉽게 확인해요`}
            description={`생성한 스케줄을 기반으로\n여행 기간동안 방문할 장소들의 순서를\n지도에서 한눈에 확인할 수 있어요`}
            imageSrc={Branding_3}
          />
          <SlickItem
            title={`필요한 것들은\n모두 챙겼나요?`}
            description={`체크리스트에 빠뜨리면 안 되는 준비물과\n잊으면 안 되는 내용들을 추가해서\n여행 준비를 완벽하게 할 수 있어요`}
            imageSrc={Branding_4}
          />
          <SlickItem
            title={`여행경비 정리도\n간편하게`}
            description={`여행 기간동안 어디서 얼마나 썼는지 기록하면\n여행경비 종류별로 금액을 분석해줘요\n자, 이제 여행계획 세우러 가볼까요?`}
            imageSrc={Branding_5}
          />
        </StyledSlider>

        {curIdx !== 4 ? (
          <Button
            title="다음"
            backgroundColor="#82bedf"
            padding={15}
            titleColor="#fff"
            titleFontWeight={500}
            onClick={() => {
              sliderRef.current!.slickNext();
            }}
          />
        ) : (
          <Button
            title="시작하기 &nbsp;&rarr;"
            backgroundColor="var(--third-color)"
            padding={15}
            titleColor="#fff"
            titleFontWeight={500}
            onClick={() => navigate("/profile/edit")}
          />
        )}
      </Container>
    </PageWrapperPadding15>
  );
}

export default BrandingPage;
