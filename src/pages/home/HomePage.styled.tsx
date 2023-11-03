import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(242, 242, 247);

  nav {
    display: flex;
    justify-content: end;
    padding-bottom: 15px;
    margin-left: -5px;
    margin-right: -2px;

    svg {
      cursor: pointer;

      &:active,
      &:hover {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .profile {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 32px;
      height: 32px;
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

    .header-title {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 10px;
    }
  }
`;
