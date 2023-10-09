import { StyledDiv } from "./Banner.styled";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as ProfileOutlined } from "../../assets/icons/profile-outlined.svg";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

interface BannerProp {
  nickname: string | undefined;
  listNum: number;
}

function Banner({ nickname, listNum }: BannerProp) {
  const navigate = useNavigate();

  const btnCreateHandler = () => {
    navigate("/create");
  };

  return (
    <StyledDiv>
      <main>
        <nav>
          <img src={logo} alt="logo" />
          <div>
            <ProfileOutlined width={"80%"} />
          </div>
        </nav>
        <h1>
          안녕하세요, {nickname}님<br></br>
          {listNum > 0
            ? `${listNum}개의 여행을 앞두고 있어요!`
            : "즐거운 여행 계획을 세워보세요"}
        </h1>
      </main>
      <button onClick={btnCreateHandler}>
        <Plus width={20} />
        <label>여행일정 생성</label>
      </button>
    </StyledDiv>
  );
}

export default Banner;
