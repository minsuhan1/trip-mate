import { styled } from "styled-components";

export const StyledNavBar = styled.div`
  background-color: var(--default-page-background-color);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;

  @media all and (display-mode: standalone) {
    // 스크롤 시 최상단에 위치하면 고정
    position: sticky;
    top: 0;
    padding-top: env(safe-area-inset-top);
  }

  button,
  div {
    svg {
      padding-top: 1px;
    }
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
  }

  button {
    color: var(--primary-color);

    &:active {
      opacity: 0.5;
    }
  }

  .title {
    font-weight: 600;
    /* nav bar의 중앙에 정렬 */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .done-item {
    justify-content: end;
  }
`;
