import Banner from "../../components/home/Banner";
import { useAppSelector } from "../../hooks/useApp";
import { signOut } from "../../utils/auth/firebase";
import { StyledMain } from "./HomePage.styled";

const handleLogout = () => {
  signOut();
};

function HomePage() {
  const profile = useAppSelector((state) => state.profileReducer.state);

  return (
    <StyledMain>
      <Banner nickname={profile?.nickname} listNum={2} />
      <button onClick={handleLogout}>로그아웃</button>
    </StyledMain>
  );
}

export default HomePage;
