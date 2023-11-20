import styled from "styled-components";

export const Container = styled.div`
  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;

    img {
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      width: 50%;
    }

    h1 {
      font-size: 2.8rem;
    }

    p {
      font-size: 1.4rem;
      color: #7e7e7e;
    }
  }
`;
