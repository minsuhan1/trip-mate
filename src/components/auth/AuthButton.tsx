import React from "react";
import styled from "styled-components";

interface AuthButtonProps {
  icon: string;
  text: string;
  color: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button`
  position: absolute;
  bottom: 80px;
  width: 90%;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;

  label {
    display: flex;
    flex-grow: 1;
    padding-right: 46px;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

function AuthButton({ ...props }: AuthButtonProps) {
  return (
    <>
      <StyledButton onClick={props.onClick} color={props.color}>
        <img src={props.icon} alt="icon" />
        <label>{props.text}</label>
      </StyledButton>
    </>
  );
}

export default AuthButton;
