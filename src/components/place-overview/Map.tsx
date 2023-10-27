import { useState, useEffect, useRef } from "react";
import { MapContainer } from "./Map.styled";

function Map({ positions }: { positions: { lat: number; lng: number }[] }) {
  const [renderedMap, setRenderedMap] = useState<any>(null);
  const mapContainer = useRef<any>();

  // 커스텀 오버레이를 담을 배열
  let customOverlays: kakao.maps.CustomOverlay[] = [];

  useEffect(() => {
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer.current, mapOption);

    setRenderedMap(map);
  }, []);

  useEffect(() => {
    if (!renderedMap) return;

    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < positions.length; i++) {
      const placePosition = new kakao.maps.LatLng(
        positions[i].lat,
        positions[i].lng
      );

      const customOverlay = new kakao.maps.CustomOverlay({
        position: placePosition,
        content: `<div class="marker">
            <label>${i + 1}</label>
          </div>`,
      });

      customOverlay.setMap(renderedMap);
      customOverlays.push(customOverlay);

      bounds.extend(placePosition);
    }

    renderedMap.setBounds(bounds);

    // CleanUp
    // unmount될 때 마커를 모두 제거
    return () => {
      for (let i = 0; i < customOverlays.length; i++) {
        customOverlays[i].setMap(null);
      }
    };
  }, [customOverlays, positions, renderedMap]);

  return (
    <MapContainer>
      <div id="map" ref={mapContainer}></div>
    </MapContainer>
  );
}

export default Map;
