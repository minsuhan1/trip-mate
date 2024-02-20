import styled from "styled-components";

export const WrapperContainer = styled.div`
  @media (min-width: 1024px) {
    position: fixed;
    left: 50%;
    width: 400px;
    height: 100vh;
    position: relative;

    transform: translateX(-50%);
  }
`;
