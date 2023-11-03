import styled from "styled-components";
import { ReactComponent as Illust } from "../../assets/illustrations/triplist-empty.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 80%;
    padding-top: 20px;

    p {
      font-size: 1.2rem;
      color: #6f6f6f;
    }
  }

  .btn {
    width: 100%;
    height: 20%;
    padding: 10px;

    button {
      width: 100%;
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 12px;
      font-size: 1.6rem;
      font-weight: 500;
      color: #fff;

      &:hover,
      &:active {
        filter: brightness(0.85);
      }
    }
  }
`;

function Empty() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="main">
        <Illust width={"100%"} height={"40%"} />
        <p>새로운 여정을 시작해 보세요!</p>
      </div>
      <div className="btn">
        <button
          onClick={() => {
            navigate("/create");
          }}
        >
          지금 여행 생성하기
        </button>
      </div>
    </Container>
  );
}

export default Empty;
