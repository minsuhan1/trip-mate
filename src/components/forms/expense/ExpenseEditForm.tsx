import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "../../../contexts/auth-context";
import { useLoadingState } from "../../../contexts/loading-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/useApp";
import { TIME_ZONE_KR } from "../../../constants/constants";
import Form from "../../common/Form/Form";
import InputField from "../../common/Form/InputField";
import ErrorMessage from "../../common/Form/ErrorMessage";
import usePlaceSelector from "../../../hooks/usePlaceSelector";

function ExpenseEditForm(props: { id: string | null }) {
  // Redux dispatcher, 인증 상태
  const dispatch = useAppDispatch();
  const authCtx = useAuthState();

  // 로딩 상태
  const { setLoading } = useLoadingState();

  const navigate = useNavigate();
  const { tripId } = useParams();

  const expenseList = useAppSelector((state) => state.expenselistReducer.state);

  // (수정 페이지인 경우) 수정할 정보
  const expense_editing = props.id
    ? expenseList?.find((expense) => expense.id === props.id)?.data
    : null;

  // 장소선택 훅 사용
  const [selectedPlace, renderPlaceSelector] = usePlaceSelector(
    expense_editing?.map_data ? expense_editing.map_data : null
  );
  // 시간 입력필드 초기값
  let initTime;

  if (props.id && expense_editing) {
    initTime = new Date(expense_editing.datetime + TIME_ZONE_KR)
      .toISOString()
      .slice(0, 16);
  } else {
    initTime = new Date(Date.now() + TIME_ZONE_KR).toISOString().slice(0, 16);
  }

  // 폼 values 인터페이스
  interface IValues {
    title: string;
    datetime: number;
    price: number;
  }

  // 폼 초기값
  const initFormValues = {
    title: expense_editing?.title || "",
    datetime: initTime,
    price: expense_editing?.price || "",
  };

  // 폼 검증 메서드
  const validate = (values: IValues) => {
    const errors = {
      title: "",
      datetime: "",
      price: "",
    };

    if (!values.title) errors.title = "지출 내용이 입력되지 않았어요";
    if (!values.datetime) errors.datetime = "시간이 입력되지 않았어요";
    if (!values.price) errors.price = "비용이 입력되지 않았어요";
    if (typeof values.price !== "number")
      errors.price = "비용은 숫자로만 입력해주세요";

    return errors;
  };

  // 폼 제출 메서드
  const handleSubmit = (values: IValues) => {
    if (authCtx.user) {
      setLoading(true);
      const uid = authCtx.user.uid;
      if (props.id && expense_editing) {
        /* [여행경비 수정] */
        // 폼에 입력된 값
        const formValues = {
          title: values.title,
        };
      }
    }
  };

  return (
    <>
      <Form
        props={{
          initialValues: initFormValues,
          validate: validate,
          onSubmit: handleSubmit,
        }}
      >
        {renderPlaceSelector()}

        <InputField
          type="text"
          name="title"
          label="제목 *"
          placeholder="지출 내용을 입력해주세요"
        />
        <ErrorMessage name="title" />

        <InputField
          type="datetime-local"
          name="datetime"
          label="시간 *"
          placeholder="언제 쓰셨나요?"
        />
        <ErrorMessage name="datetime" />

        <InputField
          type="number"
          name="price"
          label="비용 (단위: 원) *"
          placeholder="숫자만 입력해주세요"
        />
        <ErrorMessage name="price" />
      </Form>
    </>
  );
}

export default ExpenseEditForm;
