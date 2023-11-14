import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-height: calc(100% - 15px - 40px - 40px - 30px - 50px);
  flex-direction: column;
  margin-bottom: 100px;

  .search-box {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    background-color: rgb(227, 227, 232);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 8px;
    gap: 5px;

    svg,
    input::placeholder {
      color: rgb(127, 127, 133);
    }

    input {
      background-color: inherit;
      font-size: 1.4rem;
      flex-grow: 1;
    }
  }

  ul {
    margin-top: 25px;
    background-color: #fff;
    border-radius: 8px;
  }
`;
