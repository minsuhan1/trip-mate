import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  padding: 10px 8px 10px 12px;
  cursor: pointer;
  background-color: #fff;

  &:active {
    background-color: rgb(230, 230, 230);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(242, 242, 247);
  }

  .info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    & .title-and-price {
      font-size: 1.6rem;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .price {
        display: flex;
        gap: 10px;
        align-items: center;

        svg {
          color: rgb(200, 200, 200);
          margin-top: 2px;
        }
      }
    }

    & .details {
      font-size: 1.2rem;
      color: rgb(150, 150, 150);
    }
  }

  .chevron {
    transform: rotate(180deg);
  }
`;
