import styled from "styled-components";

export const Container = styled.div`
  & .details {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-weight: 600;
      font-size: 50px;
    }

    p {
      font-size: 1.4rem;
      font-weight: 400;
      color: #777;
    }
  }
`;
