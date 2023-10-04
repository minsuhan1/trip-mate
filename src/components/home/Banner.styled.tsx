import styled from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 35%;

  main {
    background-color: var(--primary-color);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border-radius: 0 0 45px 45px;

    nav {
      padding: 0 10px;
      height: 25%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 70px;
        filter: invert(1);
      }

      div {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 90px;
        cursor: pointer;

        &:active {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    h1 {
      height: 50%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      line-height: 1.5;
    }
  }

  button {
    display: flex;
    gap: 2px;
    align-items: center;
    align-self: center;
    position: relative;
    transform: translateY(-50%);
    background-color: var(--secondary-color);
    border-radius: 45px;
    padding: 0 16px;
    height: 48px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);

    &:active {
      filter: brightness(95%);
    }

    label {
      font-size: 1.6rem;
      display: inline-block;
      padding: 0 0 0.2em;
      margin-top: 0.1em;
      vertical-align: top;
    }
  }
`;
