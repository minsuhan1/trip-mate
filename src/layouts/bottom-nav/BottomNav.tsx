import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as MapIcon } from "../../assets/icons/map.svg";
import { ReactComponent as ChecklistIcon } from "../../assets/icons/checklist.svg";
import { ReactComponent as WalletIcon } from "../../assets/icons/wallet.svg";
import { NavStyle, StyledNav } from "./BottomNav.styled";

function BottomNav() {
  return (
    <>
      <Outlet />

      <StyledNav>
        {/* 하위 경로를 포함하지 않고 정확히 root 경로일 때만 활성화하고 싶은 경우 end prop을 추가 */}
        <NavStyle to="" end>
          <CalendarIcon width={40} />
          <label>일정</label>
        </NavStyle>
        <NavStyle to="map">
          <MapIcon width={40} />
          <label>지도</label>
        </NavStyle>
        <NavStyle to="checklist">
          <ChecklistIcon width={40} />
          <label>체크리스트</label>
        </NavStyle>
        <NavStyle to="expenses">
          <WalletIcon width={40} />
          <label>여행경비</label>
        </NavStyle>
      </StyledNav>
    </>
  );
}

export default BottomNav;
