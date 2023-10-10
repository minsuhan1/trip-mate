import styled from "styled-components";

export const StyledButton = styled.button`
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
    width: 100px;
    right: 50%;
    top: 110%;
  }
`;
