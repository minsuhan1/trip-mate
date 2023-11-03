import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 30px - 55px - 50px);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const List = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 10px;
  margin: 0 -10px;

  overflow-y: auto;
`;
