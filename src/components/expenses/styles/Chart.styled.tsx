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

    .bar-item:nth-child(1) {
      background-color: #60a5fa;
    }
    .bar-item:nth-child(2) {
      background-color: #6ee7b7;
    }
    .bar-item:nth-child(3) {
      background-color: #fde047;
    }
    .bar-item:nth-child(4) {
      background-color: #fca5a5;
    }
    .bar-item:nth-child(5) {
      background-color: #fdd3e8;
    }
    .bar-item:nth-child(6) {
      background-color: #c1e2a5;
    }
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

      & div[class^="square"] {
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

    & .square-0 {
      background-color: #60a5fa;
    }

    & .square-1 {
      background-color: #6ee7b7;
    }

    & .square-2 {
      background-color: #fde047;
    }

    & .square-3 {
      background-color: #fca5a5;
    }

    & .square-4 {
      background-color: #fdd3e8;
    }

    & .square-5 {
      background-color: #c1e2a5;
    }
  }
`;
