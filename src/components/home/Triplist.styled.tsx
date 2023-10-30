import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 65%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

export const List = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
  overflow-y: auto;
`;
