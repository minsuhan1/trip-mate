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

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
  }
`;
