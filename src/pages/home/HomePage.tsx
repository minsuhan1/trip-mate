import Triplist from "../../components/home/Triplist";
import { useAppSelector } from "../../hooks/useApp";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { useNavigate } from "react-router-dom";
import { PageWrapperPadding15 } from "../../styles/page-wrap-padding-15";
import NavBarWithIcons from "../../components/common/NavBarWithIcons/NavBarWithIcons";
import LargeTitle from "../../components/common/LargeTitle/LargeTitle";
import { Header } from "./HomePage.styled";

function HomePage() {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.profileReducer.state);

  return (
    <PageWrapperPadding15>
      <NavBarWithIcons
        right={[
          <PlusIcon
            width={25}
            onClick={() => {
              navigate("/create");
            }}
          />,
        ]}
      />

      <Header>
        <LargeTitle title="여행 목록" />
        <div className="profile" onClick={() => navigate("/profile")}>
          {profile?.image ? (
            <img src={profile.image} alt="profile" />
          ) : (
            <h1>{profile && profile.nickname.slice(0, 2)}</h1>
          )}
        </div>
      </Header>
      <Triplist />
    </PageWrapperPadding15>
  );
}

export default HomePage;
