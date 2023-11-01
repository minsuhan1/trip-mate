import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.1);

  background-color: #ffffff55;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;

  // NavLink가 생성한 a 태그 스타일 제거
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const NavStyle = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 70px;

  svg {
    color: #b3b3b3;
  }

  label {
    font-size: 1.2rem;
    color: #b3b3b3;
  }

  &.active {
    svg,
    label {
      color: var(--primary-color);
    }
  }
`;
