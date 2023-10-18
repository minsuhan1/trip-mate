import styled from "styled-components";

export const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  align-items: center;
  height: 50px;

  // 스크롤바 표시 숨기기
  // Chrome, Safari, Opera, Edge
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE
  scrollbar-width: none; // Firefox
`;

export const Tab = styled.button<{ $focused?: boolean }>`
  flex-shrink: 0;
  height: 40px;
  color: var(--primary-color);
  font-size: 1.4rem;
  background-color: rgba(117, 186, 224, 0.08);
  border-radius: 45px;
  padding: 10px 12px;
  box-shadow: ${(props) =>
    props.$focused ? "inset 0 0 0 1px var(--primary-color)" : "none"};

  &:active {
    background-color: rgba(117, 186, 224, 0.12);
  }
`;
