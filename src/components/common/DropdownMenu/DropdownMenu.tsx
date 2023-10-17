import { Ul } from "./DropdownMenu.styled";

function DropdownMenu(props: {
  menuArr: Array<{ label: string; onClick: React.MouseEventHandler }>;
}) {
  return (
    <Ul>
      {props.menuArr.map((menu, idx) => (
        <li key={idx} onClick={menu.onClick}>
          {menu.label}
        </li>
      ))}
    </Ul>
  );
}

export default DropdownMenu;
