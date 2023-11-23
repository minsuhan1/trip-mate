import styled from "styled-components";

export const MapContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  #map {
    width: 100%;
    height: 100%;
  }

  .marker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    background-color: #ff5555;
    border-radius: 50%;
    border: 2px solid #fff;

    label {
      font-size: 1.4rem;
      color: #fff;
      font-weight: 600;
      padding-bottom: 2px;
    }
  }
`;
