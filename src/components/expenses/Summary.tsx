import { IExpense, IExpenseList } from "../../store/expensesReducer";
import Chart from "./Chart";
import { Container } from "./styles/Summary.styled";

interface Prop {
  list: IExpenseList;
}

function Summary(props: Prop) {
  // 총액
  const totalPrice = props.list.reduce(
    (acc: number, cur: IExpense) => acc + cur.data.price,
    0
  );

  // 차트 데이터 생성
  let initData = {
    쇼핑: 0,
    식비: 0,
    항공: 0,
    숙박: 0,
    교통: 0,
    기타: 0,
  };

  props.list.forEach(
    (expense, idx) => (initData[expense.data.type] += expense.data.price)
  );

  const chartData = Object.entries(initData).sort(([, a], [, b]) => b - a); // 금액이 큰 유형부터 내림차순 정렬

  return (
    <Container>
      <div className="total-price">
        <h1>
          {"\uFFE6"}
          {totalPrice.toLocaleString("ko-KR")}
        </h1>
      </div>
      <div className="chart">
        <Chart data={chartData} totalPrice={totalPrice} />
      </div>
    </Container>
  );
}

export default Summary;
