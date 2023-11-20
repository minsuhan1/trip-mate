import { styled } from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  input {
    background-color: rgba(0, 0, 0, 0);
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

    // input type='date' 일 경우 placeholder 보이기 위한 설정
    &[type="date"],
    &[type="datetime-local"] {
      -webkit-appearance: none;
      background-color: inherit;
      height: 50px;
    }
  }

  &:focus-within {
    label {
      color: var(--primary-color);
    }
  }

  label {
    font-size: 1.2rem;
    background-color: var(--default-page-background-color);
    color: rgba(0, 0, 0, 0.6);
    align-self: start;
    transform: translate(12px, 50%);
    padding: 0 4px;
  }

  img {
    align-self: end;
    transform: translate(-10px, -34px);
    filter: opacity(0.6);
  }
`;
