import styled from "styled-components";
import background from "../assets/images/background_login.jpg";

export const Background = styled.div`
  width: 100vw;
  // 100vh를 브라우저 상하단 메뉴를 제외한 화면 크기를 기준으로 함
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.7)),
    url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50%;
`;

export const Logo = styled.img`
  width: 80vw;
  filter: invert(1);
`;

export const Footer = styled.footer`
  height: 20px;
  color: #fff;
  font-size: 1.2rem;
  position: relative;
  transform: translateY(500%);
`;
