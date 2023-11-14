import styled from "styled-components";
import { ReactComponent as AirplaneIcon } from "../../assets/icons/expenses/airplane.svg";
import { ReactComponent as EtcIcon } from "../../assets/icons/expenses/etc.svg";
import { ReactComponent as MealIcon } from "../../assets/icons/expenses/meal.svg";
import { ReactComponent as RoomIcon } from "../../assets/icons/expenses/room.svg";
import { ReactComponent as ShoppingIcon } from "../../assets/icons/expenses/shopping.svg";
import { ReactComponent as TransportIcon } from "../../assets/icons/expenses/transport.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--secondary-color-lighten);
  border: 1px solid var(--secondary-color);

  svg {
    fill: var(--primary-color);
  }
`;

function TypeIcon({ type }: { type: string }) {
  return (
    <Container>
      {type === "항공" && <AirplaneIcon width={30} />}
      {type === "숙박" && <RoomIcon width={30} />}
      {type === "식비" && <MealIcon width={30} />}
      {type === "쇼핑" && <ShoppingIcon width={30} />}
      {type === "교통" && <TransportIcon width={30} />}
      {type === "기타" && <EtcIcon width={30} />}
    </Container>
  );
}

export default TypeIcon;
