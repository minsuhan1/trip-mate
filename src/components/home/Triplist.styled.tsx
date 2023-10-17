import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 65%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

export const List = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  overflow-y: auto;

  // 스크롤바 표시 숨기기
  // Chrome, Safari, Opera, Edge
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE
  scrollbar-width: none; // Firefox
`;
