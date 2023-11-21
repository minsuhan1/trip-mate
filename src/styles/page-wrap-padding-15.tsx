import styled from "styled-components";

export const PageWrapperPadding15 = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 15px;
  width: 100vw;
  height: 100%;
  background-color: var(--default-page-background-color);
  overflow-y: scroll;
  overflow-x: hidden;

  @media all and (display-mode: standalone) {
    padding: 0 15px 15px 15px;
  }
`;
