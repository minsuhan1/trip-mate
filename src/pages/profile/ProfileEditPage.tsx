import { useAppSelector } from "../../hooks/useApp";
import { getProfileInfo } from "../../store/profileReducer";
import { AuthState } from "../../contexts/auth-context";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../../store";

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

  return profile.state?.id ? (
    <Navigate to="/home" />
  ) : (
    <div>프로필 생성 페이지</div>
  );
}

export default ProfileEditPage;
