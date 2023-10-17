import styled from "styled-components";

export const Element = styled.li`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 70px;
  background-color: #f4f4f4;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover,
  &:active {
    filter: brightness(95%);
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

  p {
  }
`;
