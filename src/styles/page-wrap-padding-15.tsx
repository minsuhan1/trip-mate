import styled from "styled-components";

export const PageWrapperPadding15 = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.$backgroundColor
      ? props.$backgroundColor
      : "var(--default-page-background-color)"};
  overflow-y: scroll;
  overflow-x: hidden;

  @media all and (display-mode: standalone) {
    padding: 0 15px 15px 15px;
  }
`;
