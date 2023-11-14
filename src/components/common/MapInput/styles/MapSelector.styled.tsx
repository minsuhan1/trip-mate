import styled from "styled-components";

export const MapContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  width: 95%;
  height: 95%;

  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 4px #000;

  animation: fadein 0.5s forwards;
  transform-origin: center;

  z-index: 10;

  .input-wrapper {
    display: flex;
    position: absolute;
    gap: 10px;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 80px;
    padding: 15px;

    div {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      padding: 0 10px;
    }

    input {
      flex-grow: 1;
      font-size: 1.6rem;
      background-color: #fff;
      -webkit-appearance: none;
    }

    label {
      width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      background-color: #d85656;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      cursor: pointer;
    }
  }

  #map {
    width: 100%;
    height: 50%;
  }

  #menu_wrap {
    display: flex;
    flex-direction: column;
    height: 50%;
  }

  #menu_label {
    background-color: var(--secondary-color);
    padding: 0 15px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 1.6rem;
    font-weight: 400;
    :first-child {
      font-weight: 800;
      color: #0062ff;
    }
  }

  #places_list {
    flex-grow: 1;
    overflow: auto;
    background-color: #fff;

    & .item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 15px;
      box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
      cursor: pointer;

      .info {
        display: flex;
        flex-direction: column;
        gap: 2px;

        * {
          font-size: 1.4rem;
        }

        .jibun {
          color: rgba(0, 0, 0, 0.5);

          &::before {
            content: "지번";
            padding: 0 4px;
            font-size: 1.3rem;
            background-color: rgba(0, 0, 0, 0.25);
            color: #fff;
            margin-right: 4px;
          }
        }

        .tel {
          text-decoration: none;
          color: #0062ff;
        }
      }
    }
  }

  #pagination {
    display: flex;
    flex-shrink: 0;
    gap: 20px;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
    width: 100%;
    height: 40px;
    padding: 15px;

    a {
      font-size: 1.6rem;
      font-weight: 500;
      color: #000;
      text-decoration: none;
    }
    .on {
      color: #0062ff;
    }
  }
`;
