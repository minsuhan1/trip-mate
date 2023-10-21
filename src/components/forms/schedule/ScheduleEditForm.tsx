import { useState } from "react";
import Form from "../../common/Form/Form";
import ErrorMessage from "../../common/Form/ErrorMessage";
import InputField from "../../common/Form/InputField";
import { useAppDispatch, useAppSelector } from "../../../hooks/useApp";
import { useAuthState } from "../../../contexts/auth-context";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MILLISEC_1DAY, TIME_ZONE_KR } from "../../../constants/constants";
import { addSchedule, updateSchedule } from "../../../store/scheduleReducer";
import { ReactComponent as MapPinIcon } from "../../../assets/icons/map-pin.svg";
import { NoMap, Overlay, StyledMapContainer } from "./ScheduleEditForm.styled";
import MapSelector from "./MapSelector";

// 장소 정보 인터페이스
export interface IMapData {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

function ScheduleEditForm(props: { id?: string; day?: string }) {
  // Redux dispatcher, 인증 상태
  const dispatch = useAppDispatch();
  const authCtx = useAuthState();

  const navigate = useNavigate();
  const { tripId } = useParams();
  const tripData = useAppSelector((state) => state.triplistReducer.state)?.find(
    (trip) => trip.id === tripId
  )?.data;
  const scheduleList = useAppSelector(
    (state) => state.scheduleListReducer.state
  );

  // (수정 페이지인 경우) 수정할 스케줄 정보
  const schedule_editing = props.id
    ? scheduleList?.find((schedule) => schedule.id === props.id)?.data
    : null;

  const [mapData, setMapData] = useState<IMapData | null>(
    schedule_editing?.map_data ? schedule_editing.map_data : null
  );
  const [modal, setModal] = useState<boolean>(false);

  // 장소정보 제거
  const resetMapData = () => {
    setMapData(null);
  };

  // 시간 입력창 초기값(시작시간, 종료시간), 최소 및 최대값
  let initStartTime, initEndTime, minTime, maxTime;

  if (props.id && schedule_editing && tripData) {
    /* 스케줄 수정 시 */
    initStartTime = new Date(schedule_editing.start_time + TIME_ZONE_KR)
      .toISOString()
      .slice(0, 16);

    initEndTime = new Date(schedule_editing.end_time + TIME_ZONE_KR)
      .toISOString()
      .slice(0, 16);

    // 여행 시작일
    minTime = new Date(tripData.start_date + TIME_ZONE_KR)
      .toISOString()
      .slice(0, 16);

    // 여행 종료일
    maxTime = new Date(tripData.end_date + TIME_ZONE_KR)
      .toISOString()
      .slice(0, 16);
  } else if (props.day && tripData) {
    /* 새 스케줄 생성 시 */
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

  // 폼 초기값
  const initFormValues = {
    title: schedule_editing?.title || "",
    description: schedule_editing?.description || "",
    start_time: initStartTime,
    end_time: initEndTime,
  };

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
      if (props.id && schedule_editing) {
        /* [스케줄 수정] */
        // 폼에 입력된 값
        const formValues = {
          title: values.title,
          description: values.description,
          start_time: new Date(values.start_time).getTime(),
          end_time: new Date(values.end_time).getTime(),
          map_data: mapData,
        };

        // 폼에 입력된 값과 수정 전 스케줄 정보를 비교하여 수정된 부분만 추춣
        const difference = Object.fromEntries(
          Object.entries(formValues).filter(
            ([key, val]) =>
              key in schedule_editing && schedule_editing[key] !== val
          )
        );

        // 수정된 부분 + 수정 시각 데이터를 전달하여 수정 액션 디스패치
        dispatch(
          updateSchedule({
            uid: uid,
            tripId: tripId,
            id: props.id,
            data: { ...difference, updated_at: Date.now() },
          })
        ).then(() => {
          navigate(`/trip/${tripId}`);
        });
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
              map_data: mapData,
            },
          })
        ).then(() => {
          navigate(`/trip/${tripId}`);
        });
      }
    }
  };

  return tripData ? (
    <>
      <Form
        props={{
          initialValues: initFormValues,
          validate: validate,
          onSubmit: handleSubmit,
        }}
      >
        <StyledMapContainer>
          {!mapData ? (
            <NoMap>
              <MapPinIcon width={36} />
              <span>지도에서 여행 장소를 추가할 수 있어요</span>
            </NoMap>
          ) : (
            <div></div>
          )}
          {!mapData && (
            <label
              onClick={() => {
                setModal(true);
              }}
            >
              장소 정보 추가
            </label>
          )}
          {mapData && <label onClick={resetMapData}>장소 정보 제거</label>}
        </StyledMapContainer>

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
      {modal && <Overlay />}
      {modal && (
        <MapSelector
          onClose={(e: React.MouseEvent) => {
            e.preventDefault();
            setModal(false);
          }}
          onSelect={(mapData: IMapData) => {
            console.log(mapData);
            setMapData(mapData);
            setModal(false);
          }}
        />
      )}
    </>
  ) : (
    <Navigate to="/home" />
  );
}

export default ScheduleEditForm;
