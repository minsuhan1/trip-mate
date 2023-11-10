import { useState } from "react";
import { IMapData } from "../components/common/MapInput/Map";
import MapInput from "../components/common/MapInput/MapInput";

type HookResult = [IMapData | null, () => React.ReactNode];

function usePlaceSelector(initPlace: IMapData | null): HookResult {
  const [mapData, setMapData] = useState<IMapData | null>(initPlace);

  // 장소정보 제거
  const resetMapData = () => {
    setMapData(null);
  };

  // 장소 추가 컴포넌트를 렌더링하는 메서드
  const renderSelector = () => (
    <MapInput
      mapData={mapData}
      onReset={resetMapData}
      onPlaceSelected={(mapData: IMapData) => {
        setMapData(mapData);
      }}
    />
  );

  // 선택된 장소와 장소 추가 컴포넌트를 렌더링하는 메서드를 외부에서 사용하게 함
  return [mapData, renderSelector];
}

export default usePlaceSelector;
