import styled from "styled-components";

export const Container = styled.div`
  height: 120px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
  gap: 2px;

  h1 {
    font-size: 1.8rem;
  }

  .time,
  .address {
    display: flex;
    gap: 4px;
  }

  .address {
    color: #7c7c7c;
  }

  .idx {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff5555;
    border-radius: 45px;
    width: 20px;
    height: 20px;
    top: 5px;
    left: 5px;

    label {
      font-size: 1.4rem;
      font-weight: 600;
      color: #fff;
      padding-bottom: 2px;
    }
  }
`;
