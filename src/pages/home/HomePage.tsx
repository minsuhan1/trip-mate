import Banner from "../../components/home/Banner";
import Triplist from "../../components/home/Triplist";
import { useAppSelector } from "../../hooks/useApp";
import { signOut } from "../../utils/auth/firebase";
import { StyledMain } from "./HomePage.styled";

const handleLogout = () => {
  signOut();
};

function HomePage() {
  const profile = useAppSelector((state) => state.profileReducer.state);
  const triplist = useAppSelector((state) => state.triplistReducer.state);

  return (
    <StyledMain>
      <Banner
        nickname={profile?.nickname}
        listNum={triplist ? triplist.length : 0}
      />
      <Triplist />
      <button onClick={handleLogout}>로그아웃</button>
    </StyledMain>
  );
}

export default HomePage;
