import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { Container } from "./ExpenseDetailPage.styled";
import TypeIcon from "../../components/expenses/TypeIcon";
import { IExpenseData, deleteExpense } from "../../store/expensesReducer";
import Spacing from "../../components/common/Spacing/Spacing";
import Map from "../../components/common/MapInput/Map";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { useAuthState } from "../../contexts/auth-context";
import { useLoadingState } from "../../contexts/loading-context";

function ExpenseDetailPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authCtx = useAuthState();
  const { setLoading } = useLoadingState();

  const { id } = useParams();
  const data: IExpenseData | undefined = useAppSelector((state) =>
    state.expenselistReducer.state?.find((expense, idx) => expense.id === id)
  )?.data;

  const onDelete = async () => {
    if (window.confirm("현재 소비내역을 삭제할까요?") && authCtx.user && data) {
      setLoading(true);

      await dispatch(
        deleteExpense({
          uid: authCtx.user.uid,
          tripId: data.trip_id,
          id: id!,
        })
      );

      setLoading(false);

      navigate("../expenses");
    }
  };

  return data ? (
    <Container>
      <nav>
        <ChevronLeftIcon width={25} onClick={() => navigate("../expenses")} />
        <EditIcon
          width={18}
          onClick={() => navigate(`../expenses/create?id=${id}`)}
        />
      </nav>

      <div className="details">
        <Spacing size={15} />
        <TypeIcon type={data.type} />
        <h1>
          {"\uFFE6"}
          {data.price.toLocaleString("ko-KR")}
        </h1>
        <p>{data.title}</p>
        {data.map_data && <p>{data.map_data.name}</p>}
        <p>
          {new Date(data.datetime).toLocaleDateString("ko-KR")}
          &nbsp;&nbsp;
          {new Date(data.datetime).toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          })}
        </p>

        {data.map_data && (
          <>
            <Spacing size={20} />
            <Map {...data.map_data} />
          </>
        )}
      </div>

      <Spacing size={50} />
      <button onClick={onDelete}>삭제</button>
    </Container>
  ) : (
    <div></div>
  );
}

export default ExpenseDetailPage;
