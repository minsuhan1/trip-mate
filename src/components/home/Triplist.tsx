import { useState } from "react";
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

  const initTrips = triplist;
  const [trips, setTrips] = useState(initTrips);
  const [tabIdx, setTabIdx] = useState(0);

  const filterTrips = (type: "all" | "incoming" | "past") => {
    const today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).getTime();
    let results = initTrips;

    if (type === "all") {
      setTabIdx(0);
    }
    if (type === "incoming") {
      setTabIdx(1);
      results = initTrips?.filter((trip) => trip.data.start_date > today);
    }
    if (type === "past") {
      setTabIdx(2);
      results = initTrips?.filter((trip) => trip.data.start_date < today);
    }

    setTrips(results);
  };

  const menuArr = [
    {
      label: "전체",
      onClick: () => {
        filterTrips("all");
      },
    },
    {
      label: "다가올 여행",
      onClick: () => {
        filterTrips("incoming");
      },
    },
    {
      label: "다녀온 여행",
      onClick: () => {
        filterTrips("past");
      },
    },
  ];

  return (
    <Container>
      <TabMenu>
        {menuArr.map((menu, idx) => {
          return (
            <Tab
              $focused={idx === tabIdx ? true : false}
              onClick={menu.onClick}
            >
              {menu.label}
            </Tab>
          );
        })}
        {/* <Tab $focused={true}>전체</Tab>
        <Tab>다가올 여행</Tab>
        <Tab>다녀온 여행</Tab> */}
      </TabMenu>
      <List>
        {trips && trips.length > 0 ? (
          trips.map((data: ITrip) => (
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
