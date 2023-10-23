import styled from "styled-components";

export const Element = styled.li`
  position: relative;
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 75px;
  background-color: #f4f4f4;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover,
  &:active {
    filter: brightness(95%);
  }
`;

// 스케줄 메뉴
export const Menu = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: end;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  animation: fadein 0.3s;
  -moz-animation: fadein 0.3s; /* Firefox */
  -webkit-animation: fadein 0.3s; /* Safari and Chrome */
  -o-animation: fadein 0.3s; /* Opera */

  nav {
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-right: 10px;
  }
`;

// 라벨 색
export const Color = styled.div`
  width: 8px;
  height: 100%;
`;

// 시간
export const Time = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 500;
`;

// 제목, 설명, 주소
export const Info = styled.div`
  padding-left: 5%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  height: 100%;

  h1 {
    font-size: 1.4rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 400;
    color: #7c7c7c;
  }

  #place_name {
    font-size: 1.2rem;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 2px;

    svg {
      padding-top: 2px;
    }

    p {
      color: var(--primary-color);
    }
  }
`;
