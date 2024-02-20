import styled from "styled-components";

export const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  align-items: center;
  height: 50px;
  z-index: 1;

  // overflow-x: scroll로 인해 잘린 shadow 살리기
  margin: 0 -8px;
  padding: 0 8px;
`;

export const Tab = styled.button<{ $focused?: boolean; $shadow?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 40px;
  color: var(--primary-color);
  font-size: 1.4rem;
  background-color: var(--secondary-color-lighten);
  border-radius: 45px;
  padding: 10px 12px;
  box-shadow: ${(props) =>
    props.$focused
      ? `${
          props.$shadow ? "0 0 8px rgba(0,0,0,0.25), " : ""
        } inset 0 0 0 1px var(--primary-color)`
      : `${props.$shadow ? "0 0 8px rgba(0,0,0,0.25) " : ""}`};

  &:active {
    background-color: #eaf7ff;
  }
`;
