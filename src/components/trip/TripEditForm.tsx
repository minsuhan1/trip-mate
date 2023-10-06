import { useRef, useState } from "react";
import { useAuthState } from "../../contexts/auth-context";
import { useAppDispatch } from "../../hooks/useApp";
import Form from "../common/form/Form";
import InputField from "../common/form/InputField";
import ErrorMessage from "../common/form/ErrorMessage";
import { NoImage, StyledImageUploadContainer } from "./TripEditForm.styled";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera.svg";
import { addTrip } from "../../store/triplistReducer";
import { useNavigate } from "react-router-dom";

function TripEditForm() {
  // 대표 이미지 상태
  const [imageSrc, setImageSrc]: any = useState(null);
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
  const navigate = useNavigate();

  // 폼 values 인터페이스
  interface IValues {
    title: string;
    start_date: number;
    end_date: number;
  }

  // 폼 검증 메서드
  const validate = (values: IValues) => {
    const errors = {
      title: "",
      start_date: "",
      end_date: "",
    };

    if (!values.title) errors.title = "여행 제목이 입력되지 않았어요";
    if (!values.start_date) errors.start_date = "출발 날짜가 입력되지 않았어요";
    if (!values.end_date) errors.end_date = "돌아오는 날짜가 입력되지 않았어요";
    if (values.end_date < values.start_date)
      errors.end_date = "돌아오는 날짜는 출발일 이후로 설정해주세요";

    return errors;
  };

  // 폼 제출 메서드
  const handleSubmit = (values: IValues) => {
    if (authCtx.state === "loaded" && authCtx.user) {
      const uid = authCtx.user.uid;
      dispatch(
        addTrip({
          uid: uid,
          data: {
            user_id: uid,
            title: values.title,
            start_date: new Date(values.start_date).getTime(),
            end_date: new Date(values.end_date).getTime(),
            image: imageSrc,
            created_at: Date.now(),
            updated_at: Date.now(),
          },
        })
      ).then(() => {
        navigate("/home");
      });
    }
  };

  return (
    <Form
      props={{
        initialValues: {
          title: "",
          start_date: "",
          end_date: "",
        },
        validate: validate,
        onSubmit: handleSubmit,
      }}
    >
      <StyledImageUploadContainer>
        {!imageSrc ? (
          <NoImage>
            <CameraIcon width={36} />
            <span>여행을 설명하는 사진을 추가할 수 있어요</span>
          </NoImage>
        ) : (
          <img src={imageSrc ? imageSrc : null} alt="trip-pic" />
        )}
        {!imageSrc && <label htmlFor="tripImg">대표 이미지 추가</label>}
        {imageSrc && <label onClick={resetImageSrc}>대표 이미지 제거</label>}

        <input
          accept="image/*"
          type="file"
          id="tripImg"
          onChange={onUpload}
          ref={imgRef}
        />
      </StyledImageUploadContainer>

      <InputField
        type="text"
        name="title"
        label="제목 *"
        placeholder="여행 제목을 입력해주세요"
      />
      <ErrorMessage name="title" />

      <InputField
        type="date"
        name="start_date"
        label="시작일 *"
        placeholder="출발하는 날짜를 선택해주세요"
      />
      <ErrorMessage name="start_date" />

      <InputField
        type="date"
        name="end_date"
        label="종료일 *"
        placeholder="돌아오는 날짜를 선택해주세요"
      />
      <ErrorMessage name="end_date" />
    </Form>
  );
}

export default TripEditForm;
