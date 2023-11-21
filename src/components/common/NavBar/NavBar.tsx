import { StyledNavBar } from "./NavBar.styled";
import { ReactComponent as ChevronLeft } from "../../../assets/icons/chevron-left.svg";
import Spacing from "../Spacing/Spacing";

interface NavBarProps {
  backItemTitle: string;
  topItemTitle: string;
  doneItemTitle: string;
  onBackHandler: React.MouseEventHandler;
}

/* Form 페이지에서 사용하는 상단 navbar */

function NavBar(props: NavBarProps) {
  return (
    <>
      <StyledNavBar>
        {/* left */}
        <button className="back-item" onClick={props.onBackHandler}>
          <ChevronLeft width={24} strokeWidth={2.5} />
          <label>{props.backItemTitle}</label>
        </button>

        {/* title */}
        <div className="title">{props.topItemTitle}</div>

        {/* right */}
        <button type="submit" form="form" className="done-item">
          {props.doneItemTitle}
        </button>
      </StyledNavBar>
    </>
  );
}

export default NavBar;
