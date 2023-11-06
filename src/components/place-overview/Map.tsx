import { useCallback, useState, useEffect, useRef } from "react";
import { MapContainer } from "./styles/Map.styled";
import { IScheduleList } from "../../store/scheduleReducer";
import List from "./List";

function Map({ schedules }: { schedules: IScheduleList }) {
  // 렌더링된 map 관리
  const [renderedMap, setRenderedMap] = useState<any>(null);

  // map이 렌더링될 container
  const mapContainer = useRef<any>();

  // 장소 목록 슬라이더의 현재 index 관리
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  // 장소 목록 슬라이더 index 변경 감지 시
  // currentIdx 업데이트
  const onIdxChange = useCallback((idx: number) => {
    setCurrentIdx(idx);
  }, []);

  useEffect(() => {
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer.current, mapOption);

    setRenderedMap(map);
  }, []);

  useEffect(() => {
    // 커스텀 오버레이를 담을 배열
    let customOverlays: kakao.maps.CustomOverlay[] = [];

    if (!renderedMap) return;

    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < schedules.length; i++) {
      const placePosition = new kakao.maps.LatLng(
        schedules[i].data.map_data!.latitude,
        schedules[i].data.map_data!.longitude
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
  }, [schedules, renderedMap]);

  // 장소 목록 슬라이더 index (currentIdx)가 바뀌면
  // 지도 중심좌표를 해당 장소의 좌표로 이동시킴
  useEffect(() => {
    if (!renderedMap) return;

    if (currentIdx !== null && schedules.length > currentIdx) {
      console.log(currentIdx);
      const moveLocation = new kakao.maps.LatLng(
        schedules[currentIdx].data.map_data!.latitude,
        schedules[currentIdx].data.map_data!.longitude
      );

      renderedMap.panTo(moveLocation);
    }

    // CleanUp
    // unmount될 때 index 초기화
    return () => {
      setCurrentIdx(null);
    };
  }, [currentIdx, renderedMap, schedules]);

  return (
    <>
      <MapContainer>
        <div id="map" ref={mapContainer}></div>
      </MapContainer>
      <div id="list">
        {schedules && schedules.length > 0 && (
          <List schedules={schedules} onIdxChange={onIdxChange} />
        )}
      </div>
    </>
  );
}

export default Map;
