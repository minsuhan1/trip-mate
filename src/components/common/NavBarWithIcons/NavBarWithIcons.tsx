import styled from "styled-components";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode[];
}

function NavBarWithIcons(props: Props) {
  return (
    <Container>
      {props.left ? <div className="left">{props.left}</div> : <div></div>}
      {props.right && (
        <div className="right">{props.right.map((comp, idx) => comp)}</div>
      )}
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  margin-left: -5px;
  margin-right: -2px;

  .right {
    display: flex;
    gap: 8px;
  }

  svg {
    cursor: pointer;

    &:active,
    &:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export default NavBarWithIcons;
