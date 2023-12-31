import { useState } from "react";
import { IMapData } from "./Map";
import Map from "./Map";
import { ReactComponent as MapPinIcon } from "../../../assets/icons/map-pin.svg";
import { Container, NoMap } from "./styles/MapInput.styled";
import Overlay from "../Overlay/Overlay";
import MapSelector from "./MapSelector";

interface IProps {
  mapData: IMapData | null;
  onReset: () => void;
  onPlaceSelected: (mapData: IMapData) => void;
}

function MapInput(props: IProps) {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <Container>
        {!props.mapData ? (
          <NoMap>
            <MapPinIcon width={36} />
            <span>지도에서 장소를 검색하여 추가할 수 있어요</span>
          </NoMap>
        ) : (
          <Map {...props.mapData} />
        )}
        {!props.mapData && (
          <label
            onClick={() => {
              setModal(true);
            }}
          >
            장소 정보 추가
          </label>
        )}
        {props.mapData && <label onClick={props.onReset}>장소 정보 제거</label>}
      </Container>
      {modal && <Overlay />}
      {modal && (
        <MapSelector
          onClose={(e: React.MouseEvent) => {
            e.preventDefault();
            setModal(false);
          }}
          onSelect={(mapData: IMapData) => {
            props.onPlaceSelected(mapData);
            setModal(false);
          }}
        />
      )}
    </>
  );
}

export default MapInput;
