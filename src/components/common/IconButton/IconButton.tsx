import { StyledButton } from "./IconButton.styled";

interface IIconButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function IconButton(props: IIconButtonProps) {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
}

export default IconButton;
