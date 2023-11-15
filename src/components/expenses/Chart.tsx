import { Container } from "./styles/Chart.styled";

interface Prop {
  data: [string, number][];
  totalPrice: number;
}

function Chart({ data, totalPrice }: Prop) {
  return (
    <Container>
      <div className="bar">
        {data.map(([type, price], idx) => (
          <div
            key={type}
            className="bar-item"
            style={{
              width: `${(price / totalPrice) * 100}%`,
            }}
          ></div>
        ))}
      </div>
      <div className="labels">
        {data.map(([type, price], idx) => (
          <div key={type} className="label">
            <div className={`square-${idx}`}></div>
            <div className="text">{type}</div>
            <div className="price">
              {"\uFFE6"}
              {price.toLocaleString("ko-KR")}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Chart;
