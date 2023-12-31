import { useRef, useState } from "react";
import { useAuthState } from "../../../contexts/auth-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/useApp";
import Form from "../../common/Form/Form";
import InputField from "../../common/Form/InputField";
import ErrorMessage from "../../common/Form/ErrorMessage";
import { NoImage, StyledImageUploadContainer } from "./TripEditForm.styled";
import { ReactComponent as CameraIcon } from "../../../assets/icons/camera.svg";
import { addTrip, updateTrip } from "../../../store/triplistReducer";
import { useNavigate } from "react-router-dom";
import { TIME_ZONE_KR } from "../../../constants/constants";
import { compressImage } from "../../../utils/common";
import { useLoadingState } from "../../../contexts/loading-context";

function TripEditForm(props: { id?: string }) {
  // Redux dispatcher, 인증 상태, 로딩 상태
  const dispatch = useAppDispatch();
  const authCtx = useAuthState();
  const { setLoading } = useLoadingState();

  const navigate = useNavigate();
  const triplist = useAppSelector((state) => state.triplistReducer.state);

  // (수정 페이지인 경우) 수정할 여행정보
  const trip_editing = props.id
    ? triplist?.find((trip) => trip.id === props.id)?.data
    : null;

  // 폼 초기값
  const initFormValues = {
    title: trip_editing?.title || "",
    // '2023-10-13T00:00:00.000Z' -> 'YYYY-MM-DD'
    // 9시간(ms)을 더해주어야 시차가 맞는다
    start_date: trip_editing
      ? new Date(trip_editing.start_date + TIME_ZONE_KR)
          .toISOString()
          .split("T")[0]
      : new Date(Date.now() + TIME_ZONE_KR).toISOString().split("T")[0],
    end_date: trip_editing
      ? new Date(trip_editing.end_date + TIME_ZONE_KR)
          .toISOString()
          .split("T")[0]
      : new Date(Date.now() + TIME_ZONE_KR).toISOString().split("T")[0],
  };
  const initImgSrc = trip_editing?.image || null;

  // 대표 이미지 상태
  const [imageSrc, setImageSrc]: any = useState(initImgSrc);
  const imgRef = useRef<HTMLInputElement>(null);

  // 업로드 후 이미지를 DataUrl로 변환하여 상태 업데이트
  const onUpload = async () => {
    if (!imgRef.current?.files) return;

    const file = imgRef.current.files[0] || null;
    if (file) {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile!);

      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
      };
    }
  };

  // 현재 이미지 제거
  const resetImageSrc = () => {
    setImageSrc(null);
  };

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
    if (authCtx.user) {
      setLoading(true);
      const uid = authCtx.user.uid;
      if (props.id && trip_editing) {
        /* [여행 정보 수정] */
        // 폼에 입력된 값
        const formValues = {
          title: values.title,
          start_date: new Date(values.start_date).setHours(0, 0, 0),
          end_date: new Date(values.end_date).setHours(23, 59, 59),
          image: imageSrc,
        };

        // 폼에 입력된 값과 수정 전 여행 정보를 비교하여 수정된 부분만 추출한다.
        const difference = Object.fromEntries(
          Object.entries(formValues).filter(
            ([key, val]) => key in trip_editing && trip_editing[key] !== val
          )
        );

        // 수정된 부분 + 수정 시각 데이터를 전달하여 수정 액션 디스패치
        dispatch(
          updateTrip({
            uid: uid,
            id: props.id,
            data: {
              ...difference,
              updated_at: Date.now(),
            },
          })
        ).then(() => {
          setLoading(false);
          navigate(`/trip/${props.id}`);
        });
      } else {
        /* [새 여행 생성] */
        // 새 여행 생성 액션
        dispatch(
          addTrip({
            uid: uid,
            data: {
              user_id: uid,
              title: values.title,
              start_date: new Date(values.start_date).setHours(0, 0, 0),
              end_date: new Date(values.end_date).setHours(23, 59, 59),
              image: imageSrc,
              created_at: Date.now(),
              updated_at: Date.now(),
            },
          })
        ).then(() => {
          setLoading(false);
          navigate("/home");
        });
      }
    }
  };

  return (
    <Form
      props={{
        initialValues: initFormValues,
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
