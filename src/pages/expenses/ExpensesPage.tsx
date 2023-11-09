import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useApp";
import { ReactComponent as ChevronLeftIcon } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { Container } from "./ExpensesPage.styled";
import List from "../../components/expenses/List";

function ExpensesPage() {
  const navigate = useNavigate();
  const expenseList =
    useAppSelector((state) => state.expenselistReducer.state) || [];

  // 추가 버튼 핸들러
  const onAdd = () => {
    navigate("./create");
  };

  return (
    <Container>
      <nav>
        <ChevronLeftIcon width={25} onClick={() => navigate("..")} />
        <PlusIcon width={25} onClick={onAdd} />
      </nav>
      <h1>여행경비</h1>
      <List list={[...expenseList]} />
    </Container>
  );
}

export default ExpensesPage;
