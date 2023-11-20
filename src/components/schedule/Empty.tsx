import styled from "styled-components";
import { ReactComponent as Illust } from "../../assets/illustrations/schedule-empty.svg";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  p {
    font-size: 1.2rem;
    color: #6f6f6f;
  }

  @media all and (display-mode: standalone) {
    padding-bottom: env(safe-area-inset-top);
  }
`;

function Empty() {
  return (
    <StyledDiv>
      <Illust width={"80%"} height={"45%"} />
      <p>지금 바로 스케줄을 추가해 볼까요?</p>
    </StyledDiv>
  );
}

export default Empty;
