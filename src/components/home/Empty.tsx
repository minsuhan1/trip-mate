import styled from "styled-components";
import { ReactComponent as Illust } from "../../assets/illustrations/triplist-empty.svg";

const StyledDiv = styled.div`
  width: 100%;
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
`;

function Empty() {
  return (
    <StyledDiv>
      <Illust width={"60%"} height={"30%"} />
      <p>새로운 여정을 시작해 보세요!</p>
    </StyledDiv>
  );
}

export default Empty;
