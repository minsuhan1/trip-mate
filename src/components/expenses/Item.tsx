import { IExpenseData } from "../../store/expensesReducer";
import { Container } from "./styles/Item.styled";
import { ReactComponent as ChevronLeftIcon } from "../../assets/icons/chevron-left.svg";
import { useNavigate } from "react-router-dom";

function Item(props: { data: IExpenseData }) {
  return (
    <Container>
      <div className="info">
        <div className="title-and-price">
          <div>{props.data.title}</div>
          <div className="price">
            {"\uFFE6"}
            {props.data.price.toLocaleString("ko-KR")}
            <ChevronLeftIcon className="chevron" width={20} />
          </div>
        </div>
        <div className="details">
          {props.data.map_data && <div>{props.data.map_data.name}</div>}
          <div>
            {new Date(props.data.datetime).toLocaleDateString("ko-KR")}
            &nbsp;&nbsp;
            {new Date(props.data.datetime).toLocaleTimeString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Item;
