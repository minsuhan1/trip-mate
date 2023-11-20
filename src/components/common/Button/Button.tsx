import styled from "styled-components";

interface Props {
  title: string;
  titleColor?: string;
  titleFontWeight?: number;
  backgroundColor?: string;
  padding?: number;
  width?: string | number; // number type is only for px
  height?: string | number; // number type is only for px
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
  title,
  titleColor = "#000",
  backgroundColor = "#fff",
  titleFontWeight = 400,
  padding = 10,
  width = "100%",
  height = "auto",
  onClick,
}: Props) {
  return (
    <Container
      style={{
        color: titleColor,
        backgroundColor: backgroundColor,
        fontWeight: titleFontWeight,
        padding: `${padding}px`,
        width: typeof width === "string" ? width : `${width}px`,
        height: typeof height === "string" ? height : `${height}px`,
      }}
      onClick={onClick}
    >
      {title}
    </Container>
  );
}

const Container = styled.button`
  font-size: 1.6rem;
  border-radius: 12px;

  &:active {
    filter: brightness(85%);
  }
`;

export default Button;
