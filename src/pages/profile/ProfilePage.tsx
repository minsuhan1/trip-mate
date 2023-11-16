import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { Container } from "./ProfilePage.styled";
import { ReactComponent as ChevronLeftIcon } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import ProfileIcon from "../../assets/icons/profile.svg";
import Spacing from "../../components/common/Spacing/Spacing";
import { signOut } from "../../utils/auth/firebase";
import { useAuthState } from "../../contexts/auth-context";
import { useLoadingState } from "../../contexts/loading-context";
import { deleteAccount } from "../../store/profileReducer";

function ProfilePage() {
  const trips = useAppSelector((state) => state.triplistReducer.state);
  const authCtx = useAuthState();
  const dispatch = useAppDispatch();
  const { setLoading } = useLoadingState();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.profileReducer.state);

  if (!profile) {
    navigate("/profile/edit");
  }

  const onDeleteAccount = async () => {
    const val = prompt(
      "회원 탈퇴를 위해 [닉네임]을 입력해주세요. 탈퇴 시 모든 여행 일정이 삭제됩니다"
    );
    if (trips && authCtx.user && val === profile!.nickname) {
      const tripIDs: string[] = trips.map((trip, idx) => trip.id);
      setLoading(true);
      await dispatch(
        deleteAccount({ uid: authCtx.user.uid, tripIDs: tripIDs })
      );
      setLoading(false);
      signOut();
    }
  };

  return (
    <Container>
      <nav>
        <ChevronLeftIcon width={25} onClick={() => navigate("/home")} />
        <EditIcon
          width={18}
          onClick={() => navigate(`/profile/edit?mode=edit`)}
        />
      </nav>

      <div className="profile">
        <img
          src={profile!.image ? profile!.image : ProfileIcon}
          alt="profile-img"
        />
        <Spacing size={10} />
        <h1>{profile!.nickname}</h1>
        <Spacing size={5} />
        <p>{profile!.description}</p>
      </div>

      <Spacing size={40} />
      <button onClick={() => signOut()}>로그아웃</button>
      <Spacing size={20} />
      <button onClick={onDeleteAccount}>회원탈퇴</button>
    </Container>
  );
}

export default ProfilePage;
