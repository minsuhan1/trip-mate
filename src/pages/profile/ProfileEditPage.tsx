import { useAppSelector } from "../../hooks/useApp";
import { getProfileInfo } from "../../store/profileReducer";
import { AuthState } from "../../contexts/auth-context";
import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import NavBar from "../../components/common/NavBar";
import { signOut } from "../../utils/auth/firebase";
import ProfileEditForm from "../../components/profile/ProfileEditForm";

export const loader =
  (authCtx: AuthState, dispatch: AppDispatch) => async () => {
    if (authCtx.state === "loaded" && authCtx.isAuthenticated === true) {
      await dispatch(getProfileInfo(authCtx.user.uid));
      return null;
    }
    return null;
  };

function ProfileEditPage() {
  const profile = useAppSelector((state) => state.profileReducer);
  const navigate = useNavigate();

  return profile.state?.id ? (
    <Navigate to="/home" />
  ) : (
    <div>
      <NavBar
        backItemTitle="취소"
        topItemTitle="프로필 생성"
        doneItemTitle="완료"
        onBackHandler={() => {
          signOut();
        }}
        onDoneHandler={() => {
          // test
          navigate("/home");
        }}
      />
      <ProfileEditForm />
    </div>
  );
}

export default ProfileEditPage;
