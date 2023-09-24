import { styled } from "styled-components";

export const StyledNavBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button,
  div {
    display: flex;
    align-items: center;
    padding: 12px 12px;
    font-size: 1.6rem;
  }

  button {
    width: 80px;
    color: var(--primary-color);

    &:active {
      opacity: 0.5;
    }
  }

  .bold {
    font-weight: bold;
  }

  .done-item {
    justify-content: end;
  }
`;
