import styled from "styled-components";
import { ReactComponent as Illust } from "../../assets/illustrations/triplist-empty.svg";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";

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
    display: flex;
    padding: 10px;
    width: 100%;
    height: 20%;
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
        <Button
          onClick={() => {
            navigate("/create");
          }}
          title="지금 여행 생성하기 &nbsp; &rarr;"
          titleColor="var(--primary-color)"
          backgroundColor="#ecf7ff"
          titleFontWeight={600}
        />
      </div>
    </Container>
  );
}

export default Empty;
