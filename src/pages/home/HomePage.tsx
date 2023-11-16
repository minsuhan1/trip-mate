import Triplist from "../../components/home/Triplist";
import { useAppSelector } from "../../hooks/useApp";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { Container } from "./HomePage.styled";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.profileReducer.state);

  return (
    <Container>
      <nav>
        <PlusIcon
          width={25}
          onClick={() => {
            navigate("/create");
          }}
        />
      </nav>
      <div className="header">
        <h1 className="header-title">여행 목록</h1>
        <div className="profile" onClick={() => navigate("/profile")}>
          {profile?.image ? (
            <img src={profile.image} alt="profile" />
          ) : (
            <h1>{profile && profile.nickname.slice(0, 2)}</h1>
          )}
        </div>
      </div>
      <Triplist />
    </Container>
  );
}

export default HomePage;
