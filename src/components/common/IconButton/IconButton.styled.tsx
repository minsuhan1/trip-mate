import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 45px;
  width: 40px;
  height: 40px;
  padding: 8px;
  position: relative;

  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 1);
  }

  ul {
    position: absolute;
    width: 80px;
    right: 0%;
    top: 120%;
  }
`;
