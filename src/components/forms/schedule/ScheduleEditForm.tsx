import Form from "../../common/Form/Form";
import ErrorMessage from "../../common/Form/ErrorMessage";
import InputField from "../../common/Form/InputField";
import { useAppDispatch, useAppSelector } from "../../../hooks/useApp";
import { useAuthState } from "../../../contexts/auth-context";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MILLISEC_1DAY, TIME_ZONE_KR } from "../../../constants/constants";
import { addSchedule } from "../../../store/scheduleReducer";

function ScheduleEditForm(props: { id?: string; day?: string }) {
  // Redux dispatcher, 인증 상태
  const dispatch = useAppDispatch();
  const authCtx = useAuthState();

  const navigate = useNavigate();
  const { tripId } = useParams();
  const tripData = useAppSelector((state) => state.triplistReducer.state)?.find(
    (trip) => trip.id === tripId
  )?.data;

  // 시간 입력창 초기값(시작시간, 종료시간), 최소 및 최대값
  let initStartTime, initEndTime, minTime, maxTime;

  if (props.id && tripData) {
    // initTime =
  } else if (props.day && tripData) {
    // N일차 날짜 00:00
    minTime =
      initEndTime =
      initStartTime =
        new Date(
          tripData.start_date +
            TIME_ZONE_KR +
            MILLISEC_1DAY * (parseInt(props.day) - 1)
        )
          .toISOString()
          .slice(0, 16);

    // N일차 날짜 23:59
    maxTime = new Date(
      tripData.start_date +
        TIME_ZONE_KR +
        MILLISEC_1DAY * (parseInt(props.day) - 1) +
        MILLISEC_1DAY -
        1
    )
      .toISOString()
      .slice(0, 16);
  }

  // 폼 values 인터페이스
  interface IValues {
    title: string;
    description: string;
    start_time: number;
    end_time: number;
  }

  // 폼 검증 메서드
  const validate = (values: IValues) => {
    const errors = {
      title: "",
      start_time: "",
      end_time: "",
    };

    if (!values.title) errors.title = "스케줄 제목이 입력되지 않았어요";
    if (!values.start_time) errors.start_time = "시작 시간이 입력되지 않았어요";
    if (!values.end_time) errors.end_time = "종료 시간이 입력되지 않았어요";
    if (values.end_time < values.start_time)
      errors.end_time = "종료시간은 시작시간과 같거나 그 이후로 설정해주세요";

    return errors;
  };

  // 폼 제출 메서드
  const handleSubmit = (values: IValues) => {
    /**
     * [!!!] input[type='datetime_local']은 클라이언트의 타임존을 기준으로 동작함
     */
    if (authCtx.user && tripId) {
      const uid = authCtx.user.uid;
      if (props.id) {
        /* [스케줄 수정] */
      } else {
        /* [새 스케줄 생성] */
        dispatch(
          addSchedule({
            uid: uid,
            data: {
              trip_id: tripId,
              title: values.title,
              description: values.description,
              start_time: new Date(values.start_time).getTime(),
              end_time: new Date(values.end_time).getTime(),
              created_at: Date.now(),
              updated_at: Date.now(),
            },
          })
        ).then(() => {
          navigate(`/trip/${tripId}`);
        });
      }
    }
  };

  return tripData ? (
    <Form
      props={{
        initialValues: {
          title: "",
          description: "",
          start_time: initStartTime,
          end_time: initEndTime,
        },
        validate: validate,
        onSubmit: handleSubmit,
      }}
    >
      <InputField
        type="text"
        name="title"
        label="제목 *"
        placeholder="스케줄 제목을 입력해주세요"
      />
      <ErrorMessage name="title" />

      <InputField
        type="text"
        name="description"
        label="설명"
        placeholder="간단한 설명이나 메모를 추가할 수 있어요"
      />
      <ErrorMessage name="description" />

      <InputField
        type="datetime-local"
        name="start_time"
        label="시작 *"
        placeholder="스케줄 시작 시간"
        min={minTime}
        max={maxTime}
      />
      <ErrorMessage name="start_time" />

      <InputField
        type="datetime-local"
        name="end_time"
        label="종료 *"
        placeholder="스케줄 종료 시간"
        min={minTime}
        max={maxTime}
      />
      <ErrorMessage name="end_time" />
    </Form>
  ) : (
    <Navigate to="/home" />
  );
}

export default ScheduleEditForm;
