import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);

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
