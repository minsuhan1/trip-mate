import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as XMarkIcon } from "../../../assets/icons/x-mark.svg";
import { MapContainer } from "./MapSelector.styled";
import { IMapData } from "./ScheduleEditForm";

interface MapSelectorProps {
  onSelect: (mapData: IMapData) => void;
  onClose: React.MouseEventHandler<HTMLElement>;
}

function MapSelector(props: MapSelectorProps) {
  /* 여기서부터 검색어 폼 관리 로직 */

  // 입력 폼 value 관리
  const [value, setValue] = useState("");
  // 제출한 검색어 관리
  const [keyword, setKeyword] = useState("");

  // 입력 폼 value 변화를 감지하여 상태 업데이트
  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // 폼 제출 시 제출한 검색어 업데이트
  const onKeywordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      alert("검색어를 입력해주세요");
    } else {
      setKeyword(value);
    }
  };

  /* 여기서부터 키워드로 장소 검색 및 목록 표시 로직 */

  // 렌더링될 지도 관리
  const [renderedMap, setRenderedMap] = useState<any>(null);

  // 마커를 담을 배열
  let markers: kakao.maps.Marker[] = [];

  // 지도는 한 번만 생성되어야 한다
  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도 생성
    setRenderedMap(new kakao.maps.Map(mapContainer!, mapOption));
  }, []);

  // 키워드가 변경될때마다 장소 검색을 실행
  useEffect(() => {
    // 장소 검색 객체 생성
    const ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 키워드로 장소를 검색
    searchPlaces();

    // 키워드 검색을 요청하는 함수
    function searchPlaces() {
      const searchKeyword = keyword;

      if (!searchKeyword.replace(/^\s+|\s+$/g, "")) {
        // alert("키워드를 입력해주세요!");/
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청
      ps.keywordSearch(searchKeyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(
      data: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status,
      pagination: kakao.maps.Pagination
    ) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출
        displayPlaces(data);

        // 페이지 번호를 표출
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places: kakao.maps.services.PlacesSearchResult) {
      const listEl = document.getElementById("places_list"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거
      listEl && removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시
        const placePosition = new kakao.maps.LatLng(
            Number(places[i].y),
            Number(places[i].x)
          ),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시
        // mouseout 했을 때는 인포윈도우를 닫기
        // eslint-disable-next-line no-loop-func
        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가
      listEl && listEl.appendChild(fragment);
      if (menuEl) {
        menuEl.scrollTop = 0;
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      renderedMap.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수
    function getListItem(
      index: number,
      places: kakao.maps.services.PlacesSearchResultItem
    ) {
      let el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          `">${index + 1}</span>` +
          '<div class="info">' +
          "   <h5>" +
          places.place_name +
          "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr +=
        `  <a href="tel:${places.phone}" class="tel">` +
        places.phone +
        "</a>" +
        "</div>";

      el.innerHTML = itemStr;
      el.className = "item";
      el.addEventListener("click", () => {
        const mapData: IMapData = {
          address: places.address_name,
          name: places.place_name,
          latitude: Number(places.y),
          longitude: Number(places.x),
        };
        props.onSelect(mapData);
      });

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position: kakao.maps.LatLng, idx: number) {
      const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 쓴다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(renderedMap); // 지도 위에 마커를 표출
      markers.push(marker); // 배열에 생성된 마커를 추가

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수
    function displayPagination(pagination: kakao.maps.Pagination) {
      const paginationEl = document.getElementById("pagination") as HTMLElement;
      let fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.lastChild &&
          paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i.toString();

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
    // 인포윈도우에 장소명을 표시
    function displayInfowindow(marker: kakao.maps.Marker, title: string) {
      const content =
        '<div style="padding:5px;z-index:1;font-weight:600;font-size:1.4rem;width:auto;">' +
        title +
        "</div>";

      infowindow.setContent(content);
      infowindow.open(renderedMap, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수
    function removeAllChildNods(el: Node) {
      while (el.hasChildNodes()) {
        el.lastChild && el.removeChild(el.lastChild);
      }
    }
  }, [keyword]);

  /* 렌더링 로직 */
  return (
    <MapContainer>
      <div id="map"></div>

      <div id="menu_wrap">
        <div id="menu_label">
          <span>{keyword}</span>
          <span>&nbsp;검색 결과</span>
        </div>
        <ul id="places_list"></ul>
        <div id="pagination"></div>
      </div>

      <form onSubmit={onKeywordSubmit}>
        <div>
          <SearchIcon color="#999" height={"45%"} />
          <input
            type="search"
            placeholder="키워드 입력 (ex. 제주도 명소)"
            onChange={onKeywordChange}
            required
          />
        </div>
        <label id="btn-close" onClick={props.onClose}>
          <XMarkIcon color="#fff" height={"45%"} />
        </label>
      </form>
    </MapContainer>
  );
}

export default MapSelector;
