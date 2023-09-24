import { StyledNavBar } from "./NavBar.styled";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevron-left.svg";

interface NavBarProps {
  backItemTitle: string;
  topItemTitle: string;
  doneItemTitle: string;
  onBackHandler: React.MouseEventHandler;
  onDoneHandler: React.MouseEventHandler;
}

function NavBar(props: NavBarProps) {
  return (
    <StyledNavBar>
      {/* left */}
      <button className="back-item" onClick={props.onBackHandler}>
        <ChevronLeft width={24} strokeWidth={3} />
        <label>{props.backItemTitle}</label>
      </button>

      {/* title */}
      <div className="bold">{props.topItemTitle}</div>

      {/* right */}
      <button className="bold" onClick={props.onDoneHandler}>
        {props.doneItemTitle}
      </button>
    </StyledNavBar>
  );
}

export default NavBar;
