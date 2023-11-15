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

    svg {
      cursor: pointer;

      &:active,
      &:hover {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  & .details {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-weight: 600;
      font-size: 50px;
    }

    p {
      font-size: 1.4rem;
      font-weight: 400;
      color: #777;
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
