import { useAppSelector } from "../../hooks/useApp";
import { ITrip } from "../../store/triplistReducer";
import Trip from "./Trip";
import { Container, List, Tab, TabMenu } from "./Triplist.styled";

function Triplist() {
  let triplist = useAppSelector((state) => state.triplistReducer).state;

  if (triplist && triplist.length > 0) {
    // 날짜가 빠른 순으로 여행일정목록을 정렬
    triplist = [...triplist].sort(
      (a: ITrip, b: ITrip) => a.data.start_date - b.data.start_date
    );
  }

  return (
    <Container>
      <TabMenu>
        <Tab $focused={true}>전체</Tab>
        <Tab>다가올 여행</Tab>
        <Tab>다녀온 여행</Tab>
      </TabMenu>
      <List>
        {triplist && triplist.length > 0 ? (
          triplist.map((data: ITrip) => (
            <Trip
              key={data.id}
              id={data.id}
              image={data.data.image}
              title={data.data.title}
              start_date={data.data.start_date}
              end_date={data.data.end_date}
            />
          ))
        ) : (
          <div></div>
        )}
      </List>
    </Container>
  );
}

export default Triplist;
