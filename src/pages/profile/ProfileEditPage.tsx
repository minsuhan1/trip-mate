import { useAppSelector } from "../../hooks/useApp";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar/NavBar";
import { signOut } from "../../utils/auth/firebase";
import ProfileEditForm from "../../components/forms/profile/ProfileEditForm";
import { useEffect } from "react";

function ProfileEditPage() {
  const profile = useAppSelector((state) => state.profileReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search;
  const mode = new URLSearchParams(query).get("mode");

  if (!mode && profile.state) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <NavBar
        backItemTitle="취소"
        topItemTitle={`프로필 ${mode ? "수정" : "생성"}`}
        doneItemTitle="저장"
        onBackHandler={() => {
          mode ? navigate(-1) : signOut();
        }}
      />
      <ProfileEditForm profile={profile} edit={mode ? true : false} />
    </div>
  );
}

export default ProfileEditPage;
