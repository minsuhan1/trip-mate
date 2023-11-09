import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    aspect-ratio: 16 / 10;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    width: 100%;
    object-fit: cover;
  }

  input {
    display: none;
  }
  label {
    padding: 10px;
    margin: 5px 0 20px 0;
    font-weight: bold;
    font-size: 1.4rem;
    color: var(--primary-color);
    display: inline-block;
    cursor: pointer;

    &:active {
      opacity: 0.5;
    }
  }
`;

export const NoMap = styled.div`
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.25);
  background-color: #e2e2e2;

  span {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;
