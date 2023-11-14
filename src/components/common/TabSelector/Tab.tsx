import styled from "styled-components";

const StyledDiv = styled.div<{ $selected: boolean }>`
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  font-size: 1.4rem;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$selected
      ? "var(--secondary-color)"
      : "var(--secondary-color-lighten)"};
`;

interface Props {
  label: string;
  selected: boolean;
}

function Tab(props: Props) {
  return (
    <StyledDiv $selected={props.selected}>
      <div>{props.label}</div>
    </StyledDiv>
  );
}

export default Tab;
