import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 58px;
  background-color: var(--primary-color);
  border-radius: 45px;
  z-index: 1;
  position: absolute;
  bottom: 100px;

  @media all and (display-mode: standalone) {
    bottom: calc(100px + env(safe-area-inset-bottom));
  }

  right: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;

  &:hover,
  &:active {
    filter: brightness(105%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

function FloatingAddButton(props: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button className="floating-btn" onClick={props.onClick}>
      <PlusIcon color="#fff" width={"24px"} />
    </Button>
  );
}

export default FloatingAddButton;
