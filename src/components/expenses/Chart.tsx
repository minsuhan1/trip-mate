import { Container } from "./styles/Chart.styled";

interface Prop {
  data: [string, number][];
  totalPrice: number;
}

function Chart({ data, totalPrice }: Prop) {
  const labelColors = [
    "#60a5fa",
    "#6ee7b7",
    "#fde047",
    "#fca5a5",
    "#fdd3e8",
    "#c1e2a5",
  ];

  return (
    <Container>
      <div className="bar">
        {data.map(([type, price], idx) => (
          <div
            key={type}
            className="bar-item"
            style={{
              width: `${(price / totalPrice) * 100}%`,
              backgroundColor: labelColors[idx],
            }}
          ></div>
        ))}
      </div>
      <div className="labels">
        {data.map(([type, price], idx) => (
          <div key={type} className="label">
            <div
              className="square"
              style={{
                backgroundColor: labelColors[idx],
              }}
            ></div>
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
