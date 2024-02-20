import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 80px);
  padding: 15px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media all and (display-mode: standalone) {
    padding-top: env(safe-area-inset-top);
  }
`;

export const Empty = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 80px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 1.4rem;

  z-index: -1;
`;
