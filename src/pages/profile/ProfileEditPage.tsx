import { useAppSelector } from "../../hooks/useApp";
import { Navigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import { signOut } from "../../utils/auth/firebase";
import ProfileEditForm from "../../components/profile/ProfileEditForm";

function ProfileEditPage() {
  const profile = useAppSelector((state) => state.profileReducer);

  return profile.state?.id ? (
    <Navigate to="/home" />
  ) : (
    <div>
      <NavBar
        backItemTitle="취소"
        topItemTitle="프로필 생성"
        doneItemTitle="저장"
        onBackHandler={() => {
          signOut();
        }}
      />
      <ProfileEditForm profile={profile} />
    </div>
  );
}

export default ProfileEditPage;
