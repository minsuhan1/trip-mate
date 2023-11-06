import styled from "styled-components";

export const StyledDiv = styled.div<{ $background: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.45) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${(props) => props.$background});
  background-size: cover;

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 15px;
    margin-bottom: 8vh;
    color: #fff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    p {
      font-size: 1.4rem;
    }
    h1 {
      font-size: 2.8rem;
      font-weight: 800;
    }
  }
`;
