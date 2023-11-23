import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

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
    overflow: auto;

    li {
      display: flex;
      justify-content: space-between;
      font-size: 1.6rem;
      font-weight: 400;
      padding: 16px 12px;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(242, 242, 247);
      }

      .label {
        display: flex;
        align-items: center;
        gap: 10px;

        .circle {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          border: 1px solid var(--primary-color);
          border-radius: 50%;

          cursor: pointer;
        }

        .done {
          width: 14px;
          height: 14px;
          background-color: var(--primary-color);
          border-radius: 50%;
        }

        .title {
          padding-bottom: 2px;
        }

        .title-gray {
          color: rgb(187, 187, 187);
        }
      }

      .remove {
        cursor: pointer;
        color: rgb(187, 187, 187);

        &:hover,
        &:active {
          color: #ff5555;
        }
      }
    }
  }
`;
