import { Container, Tab } from "./TabMenu.styled";

interface ITabMenuProps {
  menuArr: {
    label: string;
    onClick: () => void;
  }[];
  curTabIdx: number;
  shadow?: boolean;
}

function TabMenu(props: ITabMenuProps) {
  return (
    <Container>
      {props.menuArr.map((menu, idx) => {
        return (
          <Tab
            key={idx}
            $focused={idx === props.curTabIdx ? true : false}
            $shadow={props.shadow ? true : false}
            onClick={menu.onClick}
          >
            <div>{menu.label}</div>
          </Tab>
        );
      })}
    </Container>
  );
}

export default TabMenu;
