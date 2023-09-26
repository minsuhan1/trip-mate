import { styled } from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  input {
    font-size: 1.6rem;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
    padding: 16px 8px;
    border-radius: 4px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    &:focus {
      border: none;
      box-shadow: inset 0 0 0 2px var(--primary-color);
    }
  }

  &:focus-within {
    label {
      color: var(--primary-color);
    }
  }

  label {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.6);
    align-self: start;
    background-color: #fff;
    transform: translate(12px, 50%);
    padding: 0 4px;
  }

  img {
    align-self: end;
    transform: translate(-10px, -34px);
    filter: opacity(0.6);
  }
`;
