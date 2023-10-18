import styled from "styled-components";

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  li {
    font-size: 1.6rem;
    padding: 12px 10px;
    box-shadow: 0 1px 0px rgba(0, 0, 0, 0.1);
    &:hover,
    &:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s; /* Firefox */
  -webkit-animation: fadein 0.5s; /* Safari and Chrome */
  -o-animation: fadein 0.5s; /* Opera */
`;
