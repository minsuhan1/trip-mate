import styled from "styled-components";

export const StyledDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 65%;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  padding: 15px 15px 0 15px;
`;

export const List = styled.ul`
  flex-grow: 1;
  height: calc(100% - 50px - 80px - 30px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  margin-top: 15px;

  // 스크롤바 표시 숨기기
  // Chrome, Safari, Opera, Edge
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE
  scrollbar-width: none; // Firefox
`;
