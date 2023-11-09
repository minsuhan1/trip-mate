import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
`;

function Overlay() {
  return <Container />;
}

export default Overlay;
