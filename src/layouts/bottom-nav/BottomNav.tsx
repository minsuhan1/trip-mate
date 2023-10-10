import { NavLink, Outlet } from "react-router-dom";
import Menu from "./Menu";
import calendarIcon from "../../assets/icons/calendar.svg";
import mapIcon from "../../assets/icons/map.svg";
import checklistIcon from "../../assets/icons/checklist.svg";
import walletIcon from "../../assets/icons/wallet.svg";
import { StyledNav } from "./BottomNav.styled";

function BottomNav() {
  return (
    <>
      <Outlet />

      <StyledNav>
        <NavLink to="/">
          <Menu icon={calendarIcon} label="일정" />
        </NavLink>
        <NavLink to="/">
          <Menu icon={mapIcon} label="지도" />
        </NavLink>
        <NavLink to="/">
          <Menu icon={checklistIcon} label="체크리스트" />
        </NavLink>
        <NavLink to="/">
          <Menu icon={walletIcon} label="가계부" />
        </NavLink>
      </StyledNav>
    </>
  );
}

export default BottomNav;
