import styled from "styled-components";
import Slider from "react-slick";

export const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: visible;
  }
  .slick-slide {
    opacity: 0.7;
    padding: 10px;
  }

  .slick-current {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    opacity: 1;
    border-radius: 8px;
  }
`;
