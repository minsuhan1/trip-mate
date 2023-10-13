import styled from "styled-components";

export const Element = styled.li`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 115px;
  background-color: #f4f4f4;
  border-radius: 25px;
  overflow: hidden;
  cursor: pointer;

  &:active {
    filter: brightness(95%);
  }
`;

export const Image = styled.div`
  width: 40%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-left: 12px;

  * {
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 1.6rem;
    height: 25%;
  }

  span {
    height: 25%;
    font-size: 1.3rem;
    color: #6f6f6f;
  }
`;

export const Dday = styled.div<{ $color: string[] }>`
  height: 50%;

  label {
    border-radius: 10px;
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 6px 10px;
    color: ${(props) => props.$color[0]};
    background-color: ${(props) => props.$color[1]};
  }
`;
