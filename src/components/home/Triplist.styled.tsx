import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 65%;
  padding: 0 10px;
`;

export const TabMenu = styled.div`
  display: flex;
  gap: 10px;
`;

export const Tab = styled.button<{ $focused?: boolean }>`
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

export const List = styled.ul`
  height: calc(100% - 60px);
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
