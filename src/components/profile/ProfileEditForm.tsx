import { useState, useRef } from "react";
import { useAppDispatch } from "../../hooks/useApp";
import { Profile, updateProfileInfo } from "../../store/profileReducer";
import { useAuthState } from "../../contexts/auth-context";
import ProfileIcon from "../../assets/icons/profile.svg";
import { StyledImageUploadContainer } from "./ProfileEditform.styled";
import InputField from "../common/form/InputField";
import Form from "../common/form/Form";
import ErrorMessage from "../common/form/ErrorMessage";

function ProfileEditForm({ profile }: { profile: Profile }) {
  // 프로필 이미지 상태
  const [imageSrc, setImageSrc]: any = useState(profile.state?.image || null);
  const imgRef = useRef<HTMLInputElement>(null);

  // 업로드 후 이미지를 DataUrl로 변환하여 상태 업데이트
  const onUpload = () => {
    if (!imgRef.current?.files) return;

    const file = imgRef.current.files[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
      };
    }
  };

  // 현재 이미지 제거
  const resetImageSrc = () => {
    setImageSrc(null);
  };

  // Redux dispatcher, 인증 상태
  const dispatch = useAppDispatch();
  const authCtx = useAuthState();

  // 폼 검증 메서드
  const validate = (values: { nickname: string; description: string }) => {
    const errors = {
      nickname: "",
      description: "",
    };

    if (!values.nickname) errors.nickname = "닉네임이 입력되지 않았어요";
    if (!values.description)
      errors.description = "한줄소개가 입력되지 않았어요";

    return errors;
  };

  // 폼 제출 메서드
  const handleSubmit = (values: { nickname: string; description: string }) => {
    if (authCtx.state === "loaded" && authCtx.user) {
      const uid = authCtx.user.uid;
      dispatch(
        updateProfileInfo({
          uid: uid,
          data: {
            ...values,
            id: uid,
            image: imageSrc,
            created_at: profile.state?.created_at
              ? profile.state?.created_at
              : Date.now(),
            updated_at: Date.now(),
          },
        })
      );
    }
  };

  return (
    <Form
      props={{
        initialValues: { nickname: "", description: "" },
        validate: validate,
        onSubmit: handleSubmit,
      }}
    >
      <StyledImageUploadContainer>
        <img src={imageSrc ? imageSrc : ProfileIcon} alt="profile-img"></img>
        {!imageSrc && <label htmlFor="profileImg">프로필 이미지 추가</label>}
        {imageSrc && <label onClick={resetImageSrc}>프로필 이미지 제거</label>}

        <input
          accept="image/*"
          type="file"
          id="profileImg"
          onChange={onUpload}
          ref={imgRef}
        />
      </StyledImageUploadContainer>

      <InputField
        type="text"
        name="nickname"
        label="닉네임 *"
        placeholder="닉네임을 입력해주세요"
      />
      <ErrorMessage name="nickname" />
      <InputField
        type="text"
        name="description"
        label="한줄소개 *"
        placeholder="한줄소개를 입력해주세요"
      />
      <ErrorMessage name="description" />
    </Form>
  );
}

export default ProfileEditForm;
