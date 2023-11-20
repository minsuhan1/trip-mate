import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  width: 100%;
  // 100vh를 브라우저 상하단 메뉴를 제외한 화면 크기를 기준으로 함
  height: 100%;
  overflow: hidden;
  background-image: url("images/login-bg/1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5));
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

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;

    p {
      font-size: 2rem;
      text-shadow: 1px 1px 8px #111;
      color: #fff;
    }
  }
`;

export const Logo = styled.img`
  width: 65vw;
  margin: 10px;
  filter: invert(1);
`;

export const Footer = styled.footer`
  height: 20px;
  color: #fff;
  font-size: 1.2rem;
  margin: 30px 0;
`;
