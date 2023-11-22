import styled from "styled-components";
import Slider from "react-slick";

export const StyledSlider = styled(Slider)`
  @media all and (display-mode: standalone) {
    padding-bottom: env(safe-area-inset-bottom);
  }

  .slick-list {
    overflow: visible;
  }
  .slick-slide {
  }

  .slick-dots {
    li {
      margin: -2px;
    }
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .slick-slider {
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90%;

    & .slick-dots {
      position: relative;
      bottom: -5px;
    }
  }

  @media all and (display-mode: standalone) {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;
