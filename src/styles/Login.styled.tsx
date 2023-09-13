import { keyframes } from "styled-components";
import styled from "styled-components";

const shuffle = keyframes`
  0% {
    background-image: 
      url(/assets/images/background_login.jpg);
  }
  50% {
    background-image: 
      url("http://sipi.usc.edu/database/preview/aerials/2.1.06.png");
  }
  100% {
    background-image: 
      url("http://sipi.usc.edu/database/preview/aerials/2.1.12.png");
  }
`;

export const Background = styled.div`
  width: 100vw;
  // 100vh를 브라우저 상하단 메뉴를 제외한 화면 크기를 기준으로 함
  height: calc(var(--vh, 1vh) * 100);
  background-size: cover;
  background-repeat: no-repeat;
  animation: ${shuffle} 5s alternate linear infinite;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.7));
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
  height: 100%;
`;

export const Logo = styled.img`
  width: 80vw;
  padding: 100px 0;
  filter: invert(1);
`;

export const Footer = styled.footer`
  height: 20px;
  color: #fff;
  font-size: 1.2rem;
  margin: 30px 0;
`;
