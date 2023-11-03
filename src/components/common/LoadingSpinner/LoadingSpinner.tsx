import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    width: 36px;
    height: 36px;
    border: 3px solid #c6c6c6;
    border-bottom-color: var(--primary-color);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

function LoadingSpinner() {
  return (
    <Container>
      <span className="loader"></span>
    </Container>
  );
}

export default LoadingSpinner;
