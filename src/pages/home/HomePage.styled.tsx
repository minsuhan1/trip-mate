import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;

  & .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;

    width: 34px;
    height: 34px;
    background: linear-gradient(
      128deg,
      rgba(195, 195, 195, 1) 0%,
      rgba(154, 154, 154, 1) 100%
    );
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    &:active {
      filter: brightness(0.8);
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 500;
      color: #fff;
    }
  }
`;
