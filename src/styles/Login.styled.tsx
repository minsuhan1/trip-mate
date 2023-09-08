import styled from "styled-components";
import background from "../assets/images/background_login.jpg";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
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
  height: 50vh;
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
