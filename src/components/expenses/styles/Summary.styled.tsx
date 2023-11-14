import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  flex-shrink: 0;
  border-radius: 12px;

  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);

  .total-price,
  .chart {
    display: flex;
    align-items: center;
  }

  .total-price {
    height: 35%;

    h1 {
      padding-top: 10px;
    }
  }

  .chart {
    height: 65%;
    width: 100%;
  }

  /* background-image: linear-gradient(
    128deg,
    rgba(154, 154, 154, 1) 0%,
    rgba(195, 195, 195, 1) 40%,
    rgba(154, 154, 154, 1) 100%
  ); */
`;
