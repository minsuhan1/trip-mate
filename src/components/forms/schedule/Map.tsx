import { useState, useEffect } from "react";
import { Container } from "./styles/Map.styled";

interface MapProps {
  latitude: number;
  longitude: number;
  place_name: string;
  address: string;
}

function Map(props: MapProps) {
  // 렌더링될 지도 관리
  const [renderedMap, setRenderedMap] = useState<any>(null);

  // 지도는 한 번만 생성되어야 한다
  useEffect(() => {
    if (renderedMap) return;

    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(props.latitude, props.longitude), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer!, mapOption);

    // 마커가 표시될 위치
    const markerPosition = new kakao.maps.LatLng(
      props.latitude,
      props.longitude
    );

    // 마커 생성
    const marker = new kakao.maps.Marker({ position: markerPosition });

    marker.setMap(map);

    // 지도 표시
    setRenderedMap(map);
  }, [props.latitude, props.longitude, renderedMap]);

  return (
    <Container>
      <main id="map"></main>
      <div id="info">
        <h1>{props.place_name}</h1>
        <h2>{props.address}</h2>
      </div>
    </Container>
  );
}

export default Map;
