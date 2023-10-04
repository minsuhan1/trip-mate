import Trip from "./Trip";
import { Container, List, Tab, TabMenu } from "./Triplist.styled";

const DUMMY_DATA = [
  {
    id: "id1",
    data: {
      title: "TITLE",
      image: undefined,
      user_id: "some-user-id",
      start_date: new Date("2023/10/4").getTime(),
      end_date: new Date("2023/10/16").getTime(),
    },
  },
  {
    id: "id2",
    data: {
      title: "TITLE",
      image: undefined,
      user_id: "some-user-id",
      start_date: new Date("2023/10/6").getTime(),
      end_date: new Date("2023/10/14").getTime(),
    },
  },
  {
    id: "id3",
    data: {
      title: "TITLE",
      image: undefined,
      user_id: "some-user-id",
      start_date: new Date("2023/10/23").getTime(),
      end_date: new Date("2023/10/25").getTime(),
    },
  },
  {
    id: "id4",
    data: {
      title: "TITLE",
      image: "image-data",
      user_id: "some-user-id",
      start_date: new Date("2023/9/23").getTime(),
      end_date: new Date("2023/9/23").getTime(),
    },
  },
];

function Triplist() {
  return (
    <Container>
      <TabMenu>
        <Tab $focused={true}>전체</Tab>
        <Tab>다가올 여행</Tab>
        <Tab>다녀온 여행</Tab>
      </TabMenu>
      <List>
        {DUMMY_DATA.map((data) => (
          <Trip
            key={data.id}
            id={data.id}
            image={data.data.image}
            title={data.data.title}
            start_date={data.data.start_date}
            end_date={data.data.end_date}
          />
        ))}
      </List>
    </Container>
  );
}

export default Triplist;
