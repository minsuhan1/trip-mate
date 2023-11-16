import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;

  .bar {
    display: flex;
    width: 80%;
    height: 20px;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgb(230, 230, 230);
  }

  .labels {
    display: grid;
    row-gap: 5px;
    column-gap: 15px;
    grid-template-columns: repeat(2, 1fr);

    & .label {
      display: flex;
      gap: 4px;
      align-items: center;

      & .square {
        margin-top: 2px;
        width: 1.2rem;
        height: 1.2rem;
      }

      & .text {
        color: rgb(150, 150, 150);
        font-size: 1.2rem;
      }

      & .price {
        font-size: 1.2rem;
      }
    }
  }
`;
