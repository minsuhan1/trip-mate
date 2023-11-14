import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useApp";
import { ReactComponent as ChevronLeftIcon } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { Container } from "./ExpensesPage.styled";
import List from "../../components/expenses/List";
import Summary from "../../components/expenses/Summary";
import Spacing from "../../components/common/Spacing/Spacing";

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

      <Spacing size={10} />
      <Summary list={[...expenseList]} />
      <Spacing size={15} />

      <List
        list={[...expenseList].sort(
          (a, b) => b.data.datetime - a.data.datetime
        )}
      />
    </Container>
  );
}

export default ExpensesPage;
