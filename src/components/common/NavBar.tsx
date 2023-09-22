import { styled } from "styled-components";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevron-left.svg";

interface NavBarProps {
  backItemTitle: string;
  topItemTitle: string;
  doneItemTitle: string;
  onBackHandler: React.MouseEventHandler;
  onDoneHandler: React.MouseEventHandler;
}

const StyledNavBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button,
  div {
    display: flex;
    align-items: center;
    padding: 8px 8px;
    font-size: 1.6rem;
  }

  button {
    color: var(--primary-color);

    &:active {
      opacity: 0.5;
    }
  }

  .bold {
    font-weight: bold;
  }
`;

function NavBar(props: NavBarProps) {
  return (
    <StyledNavBar>
      <button className="back-item" onClick={props.onBackHandler}>
        <ChevronLeft width={24} strokeWidth={3} />
        <label>{props.backItemTitle}</label>
      </button>

      <div className="bold">{props.topItemTitle}</div>
      <button className="bold" onClick={props.onDoneHandler}>
        {props.doneItemTitle}
      </button>
    </StyledNavBar>
  );
}

export default NavBar;
