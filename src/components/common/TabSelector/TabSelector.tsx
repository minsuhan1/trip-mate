import Tab from "./Tab";
import styled from "styled-components";

const StyledDiv = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;

interface Props {
  items: string[];
  onClick: (idx: number) => void;
  selectedIdx: number;
}

function TabSelector(props: Props) {
  return (
    <StyledDiv>
      {props.items.map((item, idx) => (
        <li key={idx} onClick={() => props.onClick(idx)}>
          <Tab label={item} selected={idx === props.selectedIdx} />
        </li>
      ))}
    </StyledDiv>
  );
}

export default TabSelector;
