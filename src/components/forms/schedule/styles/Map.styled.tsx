import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 6px;

  #map {
    width: 100%;
    height: 80%;

    img {
      border: none;
    }
  }

  #info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
    padding: 5px;

    h1 {
      font-size: 1.6rem;
      font-weight: 500;
    }

    h2 {
      font-size: 1.2rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
