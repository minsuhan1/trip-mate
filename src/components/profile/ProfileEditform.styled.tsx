import styled from "styled-components";

export const StyledImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    aspect-ratio: 1 / 1;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 90px;
    width: 50%;
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
