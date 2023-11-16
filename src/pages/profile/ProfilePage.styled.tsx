import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  position: fixed;
  width: 100vw;
  height: 100%;
  background-color: rgba(242, 242, 247);
  overflow-y: scroll;
  overflow-x: hidden;

  nav {
    display: flex;
    justify-content: space-between;
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

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;

    img {
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      width: 50%;
    }

    h1 {
      font-size: 2.8rem;
    }

    p {
      font-size: 1.4rem;
      color: #7e7e7e;
    }
  }

  button {
    font-size: 1.6rem;
    color: #ff0000;
    padding: 10px;
    background-color: #fff;
    border-radius: 12px;

    &:active {
      background-color: rgb(230, 230, 230);
    }
  }
`;
