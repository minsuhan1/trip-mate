import { useState } from "react";
import { useAppSelector } from "../../hooks/useApp";
import { ITrip } from "../../store/triplistReducer";
import Trip from "./Trip";
import { Container, List } from "./Triplist.styled";
import Empty from "./Empty";
import TabMenu from "../common/TabMenu/TabMenu";

function Triplist() {
  let triplist = useAppSelector((state) => state.triplistReducer).state;
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();

  if (triplist && triplist.length > 0) {
    // 1. 날짜가 빠른 순으로 여행일정목록을 정렬
    // 2. 전체 목록에서 다녀온 여행들만 맨 뒤로 옮김
    // [진행중 or 다가오는 여행 목록].concat([다녀온 여행 목록])
    triplist = [...triplist]
      .sort((a: ITrip, b: ITrip) => a.data.start_date - b.data.start_date)
      .filter((trip) => trip.data.end_date >= today)
      .concat(triplist?.filter((trip) => trip.data.end_date < today));
  }

  const initTrips = triplist;
  const [trips, setTrips] = useState(initTrips);
  const [tabIdx, setTabIdx] = useState(0);

  const filterTrips = (type: "all" | "incoming" | "past") => {
    let results = initTrips
      ?.filter((trip) => trip.data.end_date >= today)
      .concat(initTrips?.filter((trip) => trip.data.end_date < today));

    if (type === "all") {
      setTabIdx(0);
    }
    if (type === "incoming") {
      setTabIdx(1);
      results = initTrips?.filter((trip) => trip.data.start_date > today);
    }
    if (type === "past") {
      setTabIdx(2);
      results = initTrips?.filter((trip) => trip.data.end_date < today);
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
      <TabMenu menuArr={menuArr} curTabIdx={tabIdx} />
      {trips && trips.length > 0 ? (
        <List>
          {trips.map((data: ITrip) => (
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
      ) : (
        <Empty />
      )}
    </Container>
  );
}

export default Triplist;
