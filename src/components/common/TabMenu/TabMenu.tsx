import { Container, Tab } from "./TabMenu.styled";

interface ITabMenuProps {
  menuArr: {
    label: string;
    onClick: () => void;
  }[];
  curTabIdx: number;
}

function TabMenu(props: ITabMenuProps) {
  return (
    <Container>
      {props.menuArr.map((menu, idx) => {
        return (
          <Tab
            key={idx}
            $focused={idx === props.curTabIdx ? true : false}
            onClick={menu.onClick}
          >
            {menu.label}
          </Tab>
        );
      })}
    </Container>
  );
}

export default TabMenu;
